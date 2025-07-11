pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-creds'
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Secret Scan - Gitleaks') {
            steps {
                sh 'docker run --rm -v $(pwd):/path zricethezav/gitleaks detect --source=/path --verbose'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${env.DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                }
            }
        }

        stage('Build & Push Images') {
            parallel {
                stage('Frontend') {
                    steps {
                        sh '''
                          docker build -t chywiz/frontend:${IMAGE_TAG} ./frontend
                          docker push chywiz/frontend:${IMAGE_TAG}
                        '''
                    }
                }

                stage('Auth Service') {
                    steps {
                        sh '''
                          docker build -t chywiz/auth-service:${IMAGE_TAG} ./backend/auth-service
                          docker push chywiz/auth-service:${IMAGE_TAG}
                        '''
                    }
                }

                stage('Budget Service') {
                    steps {
                        sh '''
                          docker build -t chywiz/budget-service:${IMAGE_TAG} ./backend/budget-service
                          docker push chywiz/budget-service:${IMAGE_TAG}
                        '''
                    }
                }

                stage('Transaction Service') {
                    steps {
                        sh '''
                          docker build -t chywiz/transaction-service:${IMAGE_TAG} ./backend/transaction-service
                          docker push chywiz/transaction-service:${IMAGE_TAG}
                        '''
                    }
                }
            }
        }

       stage('Trivy Scan') {
    parallel {
        stage('Scan Frontend') {
            steps {
                sh 'trivy image --skip-update chywiz/frontend:${IMAGE_TAG}'
            }
        }

        stage('Scan Auth Service') {
            steps {
                sh 'trivy image --skip-update chywiz/auth-service:${IMAGE_TAG}'
            }
        }

        stage('Scan Budget Service') {
            steps {
                sh 'trivy image --skip-update chywiz/budget-service:${IMAGE_TAG}'
            }
        }

        stage('Scan Transaction Service') {
            steps {
                sh 'trivy image --skip-update chywiz/transaction-service:${IMAGE_TAG}'
            }
        }
    }
}


     stage('Update Manifest & Push') {
    steps {
        withCredentials([usernamePassword(credentialsId: 'github_pat', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_TOKEN')]) {
            sh '''
                rm -rf repo
                mkdir repo
                cd repo

                git init
                git config user.name "OhioMan4"
                git config user.email "22520178@gm.uit.edu.vn"

                git remote add origin https://${GIT_USERNAME}:${GIT_TOKEN}@github.com/OhioMan4/doanchuyennanhf.git
                git config core.sparseCheckout true

                mkdir -p .git/info
                echo "deploy/" > .git/info/sparse-checkout

                git fetch origin main
                git checkout main

                sed -i 's|image: chywiz/frontend:.*|image: chywiz/frontend:latest|' deploy/frontend/deployment.yaml

                git add deploy/frontend/deployment.yaml
                git commit -m "Update frontend image to ${IMAGE_TAG}" || echo "No changes to commit"
                git push origin main || echo "Push failed (check PAT permissions)"
            '''
        }
    }
}

stage('K6 Performance Tests') {
    steps {
        sh '''
            echo "Running K6 performance Auth tests..."
            k6 run ./k6-test/auth.test.js || echo "Auth test failed"

            echo "Running K6 performance Budget tests..."
            k6 run ./k6-test/budget.test.js || echo "Budget test failed"

            echo "Running K6 performance Transaction tests..."
            k6 run ./k6-test/transaction.test.js || echo "Transaction test failed"
        '''
    }
}

    }
}
