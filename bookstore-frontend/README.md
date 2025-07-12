# 📚 Bookstore 프로젝트 설치 및 실행 가이드

이 문서는 WSL(Windows Subsystem for Linux) 환경에서 **Bookstore 웹 애플리케이션**을 구축하고 실행하는 과정을 설명합니다.

---

## ✅ 환경
- Windows 10 이상
- Ubuntu 18.04 (WSL 2)
- Java 11
- MySQL Server
- Spring Boot + React (TypeScript)

---

1. WSL 및 Ubuntu 18.04 설치

PowerShell에서 아래 명령어를 입력하여 Ubuntu 18.04를 설치합니다:

bash
wsl --install -d Ubuntu-18.04

(hostname -I,,,IP address확인)

2. MySQL 서버 설치 및 실행

bash
sudo apt update
sudo apt install mysql-server

WSL은 systemd를 지원하지 않기 때문에 수동으로 MySQL을 시작해야 합니다:

bash
sudo service mysql start      # MySQL 시작
sudo service mysql status     # MySQL 상태 확인

3. SSH 서버 설치 및 실행 (옵션: WinSCP 연동 등)

bash
sudo apt update
sudo apt install openssh-server

SSH 데몬 수동 실행 (필요 시):

bash
sudo mkdir -p /run/sshd
sudo chmod 755 /run/sshd
sudo /usr/sbin/sshd

4. Java 11 설치

bash
sudo apt update
sudo apt install openjdk-11-jdk

5. 백엔드 실행 (Spring Boot)

bash
cd ~/bookstore/bookstore-backend
mvn clean install
mvn spring-boot:run

DB접속(테이블생성)
sudo mysql -u root -p
CREATE DATABASE bookstore CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
show databases;
USE bookstore;
show tables;

6. 프론트엔드 환경 구성 (React + TypeScript)
bash
npx create-react-app bookstore-frontend
cd bookstore-frontend
npm start

브라우저에서 http://localhost:3000 접속 → 목록 확인 및 도서 등록 가능	
백엔드 서버는 http://localhost:8080 에서 실행되어야 합니다.		
localhost:8080/api/books,,,			json정보	

# 필수 라이브러리 설치
npm install axios react-router-dom bootstrap

# TypeScript 관련 타입 설치
npm install --save typescript @types/react @types/react-dom @types/react-router-dom

💡 기타 팁
프론트엔드 개발 시 npm start로 개발 서버 실행

API CORS 설정이 되어 있어야 백엔드와 통신 가능

MySQL 접속은 mysql -u root -p 명령어 사용

📦 프로젝트 구조 예시
bookstore/
├── bookstore-backend/   # Spring Boot 백엔드
└── bookstore-frontend/  # React 프론트엔드









