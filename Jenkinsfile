node {
    def Namespace = "default"
    def ImageName = "mati92/order"
    def DockerhubCred = "dockerhub"
    try {
        stage('Checkout') {
            checkout scm
            sh "git rev-parse --short HEAD > .git/commit-id"
            imageTag= readFile('.git/commit-id').trim()
        }
        stage('Environment') {
            sh 'git --version'
            echo "Branch: ${env.BRANCH_NAME}"
            sh 'docker -v'
            sh 'printenv'
        }
        stage('Build Docker test'){
            sh "docker build -t ${ImageName}:${imageTag}-test -f Dockerfile.test --no-cache ."
        }
        stage('Docker test'){
            sh "docker run --rm ${ImageName}:${imageTag}-test"
        }
        stage('Clean Docker test'){
            sh "docker rmi ${ImageName}:${imageTag}-test"
        }
        stage('Deploy'){
            if(env.BRANCH_NAME == 'master'){
                withDockerRegistry([credentialsId: "${DockerhubCred}", url: 'https://index.docker.io/v1/']) {
                    sh "docker build -t ${ImageName}:${imageTag} --no-cache ."
                    sh "docker push ${ImageName}:${imageTag}"
                }
                //sh "docker rmi -f ${ImageName}:${imageTag}"
            }
        }
        stage('Deploy on K8s'){
            sh  script: """
                set +e
                helm install --name order --set image.repository=${ImageName} --set image.tag=${imageTag} ./charts
                set -e
                """
            // update to New version
            sh "helm upgrade --wait --set image.repository=${ImageName} --set image.tag=${imageTag} order ./charts"


        }
    } catch (err) {
        currentBuild.result = 'FAILURE'
        throw err
    }
}
