---
layout: default
title: Beego Part 8 - Deploy Part 2
parent: Golang
nav_order: "91"
---

# Deploy Part 2

Now it is time to hook up to our PostgreSQL database in production.

## Try it out in Dev

To try to connect to PostgreSQL in dev, we can create a little docker compose file to try things out.

`postgres.docker-compose.yaml`

```yaml
networks:
  pg:
    driver: bridge
    external: true
services:
  stopwatch:
    container_name: postgres
    image: postgres:15
    networks:
      - pg
    env_file:
      - .env
    ports:
      - "5432:5432"
```

*to be continued*
