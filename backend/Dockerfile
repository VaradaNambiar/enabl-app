FROM debian:bookworm AS builder

ENV DEBIAN_FRONTEND=noninteractive

RUN set -ex && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        libboost-system-dev \
        libboost-thread-dev \
        libboost-asio-dev \
        libboost-log-dev \
        libboost-filesystem-dev \
        libboost-program-options-dev \
    && rm -rf /var/lib/apt/lists/

WORKDIR /app

COPY enable_app/ ./enable_app/

RUN g++ -std=c++20 -o /app/post_analyzer enable_app/main.cpp -lpthread -lboost_system

FROM debian:bookworm-slim AS final

WORKDIR /app

COPY --from=builder /app/post_analyzer .

RUN set -ex && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
        libboost-system1.81.0 \
        libboost-thread1.81.0 \
        libboost-asio1.81.0 \
        libboost-log1.81.0 \
        libboost-filesystem1.81.0 \
        libboost-program-options1.81.0 \
    && rm -rf /var/lib/apt/lists/

EXPOSE 8080

CMD ["./post_analyzer"]