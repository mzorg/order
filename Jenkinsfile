pipeline {
    agent any
    environment {
        def Namespace = "default"
        def Namespace_dev = "develop"
        def ImageName = "mati92/order"
        def DockerhubCred = "dockerhub"
        def imageTag_i = sh "git rev-parse --short HEAD > .git/commit-id"
        imageTag = readFile('.git/commit-id').trim()
    }
    stages {
        stage('Environment') {
            steps {
                sh 'git --version'
                echo "Branch: ${env.BRANCH_NAME}"
                sh 'docker -v'
                sh 'printenv'
            }
        }
        stage('Build Docker test'){
            steps {
                sh "docker build -t ${env.ImageName}:${env.imageTag}-test -f Dockerfile.test --no-cache ."
            }
        }
        stage('Docker test'){
            steps {
                sh "docker run --rm ${env.ImageName}:${env.imageTag}-test"
            }
        }
        stage('Clean Docker test'){
            steps {
                sh "docker rmi ${env.ImageName}:${env.imageTag}-test"
            }
        }
        stage('Build Docker for development'){
            when {
                branch 'develop' 
            }
            steps {
                withDockerRegistry([credentialsId: "${env.DockerhubCred}", url: 'https://index.docker.io/v1/']) {
                    sh "docker build -f Dockerfile.local -t ${env.ImageName}_dev:${env.imageTag} --no-cache ."
                    sh "docker push ${env.ImageName}_dev:${env.imageTag}"
                }
            }
        }
        stage('Build Docker for production'){
            when {
                branch 'master' 
            }
            steps {
                withDockerRegistry([credentialsId: "${env.DockerhubCred}", url: 'https://index.docker.io/v1/']) {
                    sh "docker build -t ${env.ImageName}:${env.imageTag} --no-cache ."
                    sh "docker push ${env.ImageName}:${env.imageTag}"
                }
            }
        }
        stage('Deploy on K8s for development'){
            when {
                branch 'develop' 
            }
            steps {
                sh "helm upgrade --install --wait --namespace ${env.Namespace_dev} --set microservice.name=order --set image.repository=${env.ImageName}_dev --set image.tag=${env.imageTag} order-dev ./charts"
            }
        }
        stage('Deploy on K8s for production'){
            when {
                branch 'master' 
            }
            steps {
                sh "helm upgrade --install --wait --namespace ${env.Namespace} --set microservice.name=order --set image.repository=${env.ImageName} --set image.tag=${env.imageTag} order ./charts"
            }
        }

    }
}
