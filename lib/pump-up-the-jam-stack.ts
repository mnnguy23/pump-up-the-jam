import { aws_s3_deployment, CfnOutput, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { DnsValidatedCertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { CloudFrontWebDistribution, OriginAccessIdentity, SecurityPolicyProtocol, SSLMethod, ViewerCertificate } from 'aws-cdk-lib/aws-cloudfront';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import * as path from 'path';

export class PumpUpTheJamStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const subDomain = 'mint';
    const domainName = 'pumpupthejam.io';

    const siteDomain = `${subDomain}.${domainName}`;
    
    const bucket = new Bucket(this, 'PumpUpTheJamBucket', {
      bucketName: domainName,
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html'
    });

      const zone = HostedZone.fromLookup(this, 'Zone', {
        domainName: domainName
      });
    
    const certificate = new DnsValidatedCertificate(this, 'SiteCertificate', {
        domainName: siteDomain,
        hostedZone: zone,
        region: props!.env?.region // Cloudfront only checks this region for certificates.
      });

    const originAccessIdentity = new OriginAccessIdentity(this, 'oia');

    bucket.grantRead(originAccessIdentity);

    const distribution = new CloudFrontWebDistribution(this, 'frontend-cdn', {
        viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
          sslMethod: SSLMethod.SNI,
          securityPolicy: SecurityPolicyProtocol.TLS_V1_1_2016,
          aliases: [siteDomain]
        }),

        originConfigs: [
          {
            behaviors: [{ isDefaultBehavior: true }],
            s3OriginSource: {
              s3BucketSource: bucket,
              originAccessIdentity: originAccessIdentity
            }
          }
        ]
      });
      const record = new ARecord(this, 'SiteAliasRecord', {
        recordName: siteDomain,
        target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
        zone
      });

      new CfnOutput(this, 'DistributionId', {
        value: distribution.distributionId
      });
      new CfnOutput(this, 'Certificate', {
        value: certificate.certificateArn
      });

      new CfnOutput(this, 'Site', { value: 'https://' + siteDomain });

      new CfnOutput(this, 'CF URL', {
        value: `https://${distribution.distributionDomainName}`
      });

    const src = new BucketDeployment(this, "DeployCRA", {
      sources: [
        aws_s3_deployment.Source.asset(path.join(__dirname, '..', 'frontend', 'pump-up-the-jam', 'build'))],
      destinationBucket: bucket,
      distribution: distribution,
      distributionPaths: ['/*']
    })
  }
}
