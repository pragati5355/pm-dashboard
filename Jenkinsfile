//slack
slack_channel='test_cicd'
slack_teamDomain= 'mindbowser'
slack_token_cred_id ='slack-Integration-Token-Credential-ID'

dev_bucket_name= 'dev.dashboard.metrics.com'
dev_cloudfront_id= 'E3THFBQ0TPMRHQ'
dev_portal_url= 'https://dljmungqb9yx1.cloudfront.net'
dev_bucket_region= 'ap-south-1'

stage_bucket_name= 'staging.dashboard.metrics.com'
stage_cloudfront_id= 'E15JF2C54J5DGX'
stage_portal_url= 'https://d1usw3ci0562fl.cloudfront.net'
stage_bucket_region= 'ap-south-1'

prod_bucket_name= 'dashboard.metrics.com'
prod_cloudfront_id= 'EMUTLD1CK2B71'
prod_portal_url= 'https://d14bwrywig6z9e.cloudfront.net'
prod_bucket_region= 'ap-south-1'


build_directory= 'dist/metrics'
def icons = [":heavy_check_mark:",":star-struck:",":tada:",":heart_eyes_cat:",":man_dancing:",":dancer:",":beer:"]
def randomIndex = (new Random()).nextInt(icons.size())
pipeline{
   agent{
       docker{
           image 'mindbowser/node-ng-awscli:v4-gcp-aws'
           label 'docker'
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
                  branch 'devops'
           }//when
               steps{
                   slack_send("Development: Building :coding: ")
                   sh 'ng build'
                   slack_send("Development: Uploading build to S3. :s3: ")
                   withAWS(credentials: 'aws-key', region: "${dev_bucket_region}" ) {
                   s3Upload(bucket:"${dev_bucket_name}", includePathPattern:'**/*', workingDir:"${build_directory}",excludePathPattern:'**/*.svg,**/*.jpg', cacheControl:'public,max-age=86400')
                  //  s3Upload(bucket:"${dev_bucket_name}", includePathPattern:'**/*.svg,**/*.jpg', workingDir:"${build_directory}", contentType:'image/svg+xml', cacheControl:'public,max-age=86400')
                   slack_send("Development: Invalidating  Cloudfront. :cloudfront: ")
                   cfInvalidate(distribution:"${dev_cloudfront_id}", paths:['/*'], waitForCompletion: true)
                   slack_send("Development: Deployed sucessfully. :heavy_check_mark: \nWeb URL: ${dev_portal_url}")
                   }
               }
       }//development build

       stage('Staging'){
            when{
                  branch 'staging'
           }//when
               steps{
                   slack_send("Staging: Building :coding: ")
                   sh 'ng build --configuration=staging '
                   slack_send("Staging: Uploading build to S3. :s3: ")
                   withAWS(credentials: 'aws-key', region: "${stage_bucket_region}" ) {
                   s3Upload(bucket:"${stage_bucket_name}", includePathPattern:'**/*', workingDir:"${build_directory}",excludePathPattern:'**/*.svg,**/*.jpg', cacheControl:'public,max-age=86400', acl:'PublicRead')
                   s3Upload(bucket:"${stage_bucket_name}", includePathPattern:'**/*.svg,**/*.jpg', workingDir:"${build_directory}", contentType:'image/svg+xml', cacheControl:'public,max-age=86400', acl:'PublicRead')
                   slack_send("Staging: Invalidating  Cloudfront. :cloudfront: ")
                   cfInvalidate(distribution:"${stage_cloudfront_ID}", paths:['/*'], waitForCompletion: true)
                   slack_send("Staging: Deployed sucessfully. :heavy_check_mark: \nWeb URL: ${stage_portal_url}")
                   }
               }
       }//stage build

       stage('Production'){
            when{
                  branch 'master'
           }//when
               steps{
                   slack_send("Production: Building :coding:")
                   sh 'ng build --configuration=production'
                    slack_send("Production: Uploading build to S3. :s3: ")
                   withAWS(credentials: 'aws-key', region: "${prod_bucket_region}" ) {
                   s3Upload(bucket:"${production_bucket_name}", includePathPattern:'**/*', workingDir:"${build_directory}",excludePathPattern:'**/*.svg,**/*.jpg', cacheControl:'public,max-age=86400', acl:'PublicRead')
                   s3Upload(bucket:"${production_bucket_name}", includePathPattern:'**/*.svg,**/*.jpg', workingDir:"${build_directory}", contentType:'image/svg+xml', cacheControl:'public,max-age=86400', acl:'PublicRead')
                   slack_send("Production: Invalidating  Cloudfront. :cloudfront: ")
                   cfInvalidate(distribution:"${production_cloudfront_ID}", paths:['/*'], waitForCompletion: true)
                   slack_send("Production: Deployed sucessfully. :heavy_check_mark: \nWeb URL: ${production_URL}")
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
