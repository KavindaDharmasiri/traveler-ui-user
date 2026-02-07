pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'user-ui'
        CONTAINER_NAME = 'user-ui'
        PORT = '3001'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/YOUR_USERNAME/YOUR_REPO.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE} .'
            }
        }
        
        stage('Deploy') {
            steps {
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                    docker run -d -p ${PORT}:${PORT} --name ${CONTAINER_NAME} ${DOCKER_IMAGE}
                '''
            }
        }
    }
    
    post {
        always {
            sh 'docker image prune -f'
        }
    }
}
