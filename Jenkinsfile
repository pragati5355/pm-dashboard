//slack
slack_channel='metrics_cicd'
slack_teamDomain= 'mindbowser'
slack_token_cred_id ='slack-Integration-Token-Credential-ID'

dev_bucket_name= 'dev.dashboard.metrics.com'
dev_cloudfront_id= 'E3THFBQ0TPMRHQ'
dev_portal_url= 'https://dashboard.dev.mindbowser.com/'
dev_bucket_region= 'ap-south-1'

prod_bucket_name= 'dashboard.metrics.com'
prod_cloudfront_id= 'EMUTLD1CK2B71'
prod_portal_url= 'https://dashboard.mindbowser.com/'
prod_bucket_region= 'ap-south-1'


build_directory= 'dist/metrics-pm-dashboard-web'
def icons = [":heavy_check_mark:",":star-struck:",":tada:",":heart_eyes_cat:",":man_dancing:",":dancer:",":beer:"]
def randomIndex = (new Random()).nextInt(icons.size())
pipeline{
   agent{
       docker{
           image 'mindbowser/node-ng-awscli:v4-gcp-aws'
           label 'docker'
       }
       docker {
            label "docker"
            alwaysPull true
            image 'node:v4-gcp-aws'
            registryUrl "https://442050301785.dkr.ecr.us-east-1.amazonaws.com"
            registryCredentialsId 'jenkins-ecr-user'
        }
   }
   stages{
       stage('Init')
       {
            steps {
               script {
                   lastCommitInfo = sh(script: "git log -1", returnStdout: true).trim()
                   commitContainsSkip = sh(script: "git log -1 | grep 'skip ci'", returnStatus: true)
                   slackMessage = "*${env.JOB_NAME}* *${env.BRANCH_NAME}* received a new commit. :angular: \nHere is commmit info: ${lastCommitInfo}\n*Console Output*: <${BUILD_URL}/console | (Open)>"
                   //send slack notification of new commit
                   slack_send(slackMessage)
                   //if commit message contains skip ci
                   if(commitContainsSkip == 0) {
                       skippingText = " Skipping Build for *${env.BRANCH_NAME}* branch."
                       env.shouldBuild = false
                       currentBuild.result = 'ABORTED'
                       slack_send(skippingText,"warning")
                       error('BUILD SKIPPED')
                   }
               }
           }//step end
       }
       stage('Install')
       {
           steps{
               slack_send("npm install :npm: ")
               sh 'npm install  --no-optional'
           }
       }
        stage('DEV_PR_BUILD'){
            when {
             expression {
                  // True for pull requests, false otherwise.
                  env.CHANGE_ID && env.BRANCH_NAME.startsWith("PR-")
              }
            }
               steps{
                   slack_send("PR BUILD : Building :coding: ")
                   sh 'ng build'
                   slack_send("PR: Build Successfully Completed. ")
                   //slack_send (" Hey <@${code_reviewer_slack_id}>, Will you please review and merge the pull request? :eyes: :vertical_traffic_light:  ")
               }
       }//PR build

       stage('Development'){
            when{
                  branch 'development'
           }//when
               steps{
                   slack_send("Development: Building :coding: ")
                   sh 'ng build --configuration=development'
                   slack_send("Development: Uploading build to S3. :s3: ")
                   withAWS(credentials: 'aws-key', region: "${dev_bucket_region}" ) {
                   sh "aws s3 sync ${build_directory} s3://${dev_bucket_name}  --delete --exclude '*.svg' --exclude '*.jpg' --cache-control 'public,max-age=86400'"
                   sh "aws s3 sync ${build_directory} s3://${dev_bucket_name}  --delete --exclude '*' --include '*.jpg' --content-type 'image/jpeg' --cache-control 'public,max-age=86400'"
                   sh "aws s3 sync ${build_directory} s3://${dev_bucket_name}  --delete --exclude '*' --include '*.svg' --content-type 'image/svg+xml' --cache-control 'public,max-age=86400'"
                   slack_send("Development: Invalidating  Cloudfront. :cloudfront: ")
                   cfInvalidate(distribution:"${dev_cloudfront_id}", paths:['/*'], waitForCompletion: true)
                   slack_send("Development: Deployed sucessfully. :heavy_check_mark: \nWeb URL: ${dev_portal_url}")
                   }
               }
       }//development build

       stage('Production'){
            when{
                  branch 'master'
           }//when
               steps{
                   slack_send("Production: Building :coding:")
                   sh 'ng build --configuration=production'
                    slack_send("Production: Uploading build to S3. :s3: ")
                   withAWS(credentials: 'aws-key', region: "${prod_bucket_region}" ) {
                   sh "aws s3 sync ${build_directory} s3://${prod_bucket_name}  --delete --exclude '*.svg' --exclude '*.jpg' --cache-control 'public,max-age=86400'"
                   sh "aws s3 sync ${build_directory} s3://${prod_bucket_name}  --delete --exclude '*' --include '*.jpg' --content-type 'image/jpeg' --cache-control 'public,max-age=86400'"
                   sh "aws s3 sync ${build_directory} s3://${prod_bucket_name}  --delete --exclude '*' --include '*.svg' --content-type 'image/svg+xml' --cache-control 'public,max-age=86400'"
                   slack_send("Production: Invalidating  Cloudfront. :cloudfront: ")
                   cfInvalidate(distribution:"${prod_cloudfront_id}", paths:['/*'], waitForCompletion: true)
                   slack_send("Production: Deployed sucessfully. :heavy_check_mark: \nWeb URL: ${prod_portal_url}")
                   }
               }
       }//Production build
   }//stages
   post {
       always {
           sh "chmod -R 777 ."
           deleteDir()
       }
       success {
           slack_send("*${env.BRANCH_NAME}* Build Completed Successfully.${icons[randomIndex]}. Check here: Console Output*: <${BUILD_URL}/console | (Open)>","#0066FF")
       }
       aborted{
           slack_send("Jenkins build Skipped/Aborted.","warning")
       }
       failure {
           slack_send("*${env.BRANCH_NAME}* Something went wrong.Build failed. Check here: Console Output*: <${BUILD_URL}/console | (Open)>","danger")
       }
   }//post
}
def slack_send(slackMessage,messageColor="good")
{
   slackSend channel: slack_channel, color: messageColor, message: slackMessage, teamDomain: slack_teamDomain, tokenCredentialId: slack_token_cred_id , username: 'Jenkins'
}
