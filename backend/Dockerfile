FROM mcr.microsoft.com/vscode/devcontainers/cpp:ubuntu-22.04

# Install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        libboost-system-dev \
    && rm -rf /var/lib/apt/lists/

# Copy source code
WORKDIR /app
COPY . .

# Build application
RUN g++ -std=c++20 -DCROW_USE_BOOST -O2 -o enable_app_docker enable_app/enable_app.cpp enable_app/core_logic.cpp -lboost_system -lpthread

# Expose the port the app runs on
EXPOSE 8080

# Run the server
CMD ["./enable_app_docker"]