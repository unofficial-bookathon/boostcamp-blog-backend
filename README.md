# Boostcamp Blog

## 시작방법

### 환경 변수 세팅

`.env.development` 환경변수 파일을 생성해주세요. 적절하게 변경하여 사용하시면 됩니다. 만약 docker를 사용하신다면 `npm run db:up --env=development` 으로 아래 변수와 맞는 mysql container가 생성됩니다.

> m1 맥북이 아니신 경우, `docker-copmpose.development-db.yml`에서 platform 부분을 주석하셔서 사용하시면 됩니다. (아마도)

```
PORT=3000

MYSQL_HOSTNAME=localhost
MYSQL_USERNAME=test
MYSQL_PASSWORD=test
MYSQL_PORT=3310
MYSQL_DATABASE=development
```

### 패키지 설치 및 실행

```
npm install
npm run start:dev
```

`localhost:3000/v1/docs` 에서 명세 확인이 가능합니다.

## 폴더 구성

```
.
├── README.md
├── build # 빌드된 폴더
├── docker-compose.development-db.yml ## 개발용 mysql docker-compose
├── package-lock.json
├── package.json
├── src
│   ├── app.ts  ## 앱 설정 (미들웨어 추가 등)
│   ├── apps ## 도메인 별 나누기
│   │   ├── article
│   │   ├── docs ## swagger 문서 관련 폴더
│   │   │   ├── common.yml
│   │   │   ├── swagger.router.ts
│   │   │   └── user.yml
│   │   ├── router.ts ## v1 공통 router
│   │   └── user
│   │       ├── user.controller.ts
│   │       ├── user.entity.ts
│   │       ├── user.repository.ts
│   │       ├── user.router.ts
│   │       └── user.service.ts
│   ├── common ## 공통적으로 사용하는 폴더
│   │   ├── data-source.ts
│   │   ├── exceptions ## 예외 폴더
│   │   │   └── http.exception.ts
│   │   ├── middlewares ## 미들웨어 폴더
│   │   │   ├── error.middleware.ts
│   │   │   └── logger.middleware.ts
│   │   ├── types
│   │   └── utils ## 기타 유틸 함수들
│   │       ├── catch-async.ts
│   │       ├── date-time.ts
│   │       └── logger.ts
│   ├── config ## config 관련 파일 폴더
│   │   ├── app
│   │   │   └── config.service.ts
│   │   ├── config.service.ts
│   │   └── database
│   │       ├── mysql
│   │       │   └── config.service.ts
│   │       └── typeorm
│   │           └── config.service.ts
│   └── index.ts  ## 시작점
├── tsconfig.build.json
└── tsconfig.json
```

## 사용 패키지

- winston: 로거 패키지
- morgan: API 로깅 패키지
- js-joda: Date 관리 패키지
- class-validator: validation 패키지
- class-transformer: transformer 패키지
- swagger 명세를 위한 페이지
- dotenv: 환경 변수를 로드하기 위한 패키지
- TypeORM, mysql2: 데이터베이스 orm
