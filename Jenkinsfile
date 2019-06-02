pipeline {
  agent {
    node {
      label 'host3-jenkins-dind-nodejs-slave'
    }
  }

  stages {
    stage ('Checkout Code') {
      steps {
        checkout scm
      }
    }
    stage ('Verify Tools'){
      steps {
        parallel (
          node: { sh "npm -v" },
          docker: { sh "docker -v" }
        )
      }
    }
    stage('Unit Tests'){
      steps {
        sh 'cd guestbook-backend && npm install && npm start'
        sh 'cd guestbook-frontend && npm install && npm test'
      }
    }
    stage('Static Code Analysis'){
        environment {
            scannerHome = tool 'SonarQubeScanner'
        }
      steps {
            withSonarQubeEnv('Host-2-SonarQube') {
                sh "${scannerHome}/bin/sonar-scanner"
            }
            timeout(time: 1, unit: 'MINUTES') {
                waitForQualityGate abortPipeline: true
            }
      }
    }

    stage('Build Docker image'){
     steps{
        sh 'cd guestbook-frontend && npm  run build'
        sh 'docker build -t guestbook .'
     }
    }
    stage('Run Docker container'){
     steps{
        sh 'docker run  -d --name guestbook_app -p 8080:8080 guestbook '
     }
    }

    stage('UI Tests'){
     /* Run Selenium test  */
      steps{
        sh ''
      }
     }
    stage('Load Tests'){
     steps{
     /* Load tests */
      sh ''
     }
    }
    stage('Publish Artifacts'){
     steps{
     /* Publish artifacts to Nexus private docker registry */
       sh ''
     }
    }
  }
}
