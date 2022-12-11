pipeline {
    agent any 
    stages {
        stage('build') {
            steps {
                sh 'chmod a+x ./build.sh'
                sh './build.sh'
            }
        }
    }
}
