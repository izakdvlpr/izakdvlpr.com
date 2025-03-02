pipeline {
    agent any
    environment {
        GIT_REPOSITORY_NAME = "${scm.getUserRemoteConfigs()[0].getUrl().tokenize('/')[3].split("\\.")[0]}"
        GIT_TAG = sh(script: 'git tag --contains | head -1', returnStdout: true).trim()
        GIT_BRANCH_NAME = "${env.GIT_BRANCH.split("/")[1]}"
    }
    stages {
        stage('Build and Publish Docker Images to Docker Hub') {
            when {
                expression { env.GIT_BRANCH_NAME == 'develop' } 
            }
            stages {
                stage('Login to Docker Hub') {
                    steps {
                        withCredentials([
                            usernamePassword(
                                credentialsId: 'izakdvlpr-dockerhub',
                                usernameVariable: 'DOCKER_USERNAME',
                                passwordVariable: 'DOCKER_PASSWORD'
                            )
                        ]) {
                            script {
                                env.DOCKER_IMAGE_NAME = "$DOCKER_USERNAME/${env.GIT_REPOSITORY_NAME}"
                            
                                sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                            }
                        }
                    }
                }
                stage('Build Docker Image') {
                    steps {
                        sh "docker build --target production --no-cache --tag ${env.DOCKER_IMAGE_NAME}:latest ."
                    }
                }
                stage('Push Docker Image to Docker Hub') {
                    steps {
                        sh "docker push ${env.DOCKER_IMAGE_NAME}:latest"
                    }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
            sh 'docker logout'
        }
    }
}