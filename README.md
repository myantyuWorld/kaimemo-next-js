# Docker-Next.js

## memo
[Next.jsにMaterial UIを組み込んだ環境を作る](https://zenn.dev/ttani/articles/next-materialui-setup#%E8%A3%9C%E8%B6%B3%EF%BC%9A%E3%81%BE%E3%81%A8%E3%82%81%E3%81%A6%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%99%E3%82%8B%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89)
[SWR](https://swr.vercel.app/ja/docs/getting-started)

## sam local start-api
sam local start-api -p 5000 --docker-network lambda-local --skip-pull-image --debug

## Introduction
This project is a template for Next.js development environment using TypeScript built with Docker Compose.

You can generate a new repository with the same directory structure and files as [mizu0715/docker-next.js](https://github.com/mizu0715/docker-next.js).
 
- [Docker Compose](https://docs.docker.com/get-started/08_using_compose/)
- [Next.js](https://nextjs.org/)

## Dependencies
```json
  "dependencies": {
    "@types/node": "18.11.9",
    "@types/react": "18.0.25",
    "@types/react-dom": "18.0.9",
    "eslint": "8.28.0",
    "eslint-config-next": "13.0.4",
    "next": "13.0.4",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "typescript": "4.9.3"
  }
```
## Usage
### Create a new repository
- Click [[Use this template]](https://github.com/mizu0715/docker-next.js/generate)

The new repository will start with the same files and folders as this repository.

### Git clone
```bash
git clone https://github.com/[your repository]
```

### Docker Setup
```bash
docker-compose up -d
```

### Next.js Setup
```bash
docker-compose exec app yarn

# or

docker-compose exec app bash
yarn
```


### Start Next.js in development mode
```bash
docker-compose exec app yarn dev

# or

docker-compose exec app bash
yarn dev
```

http://localhost:3000/
