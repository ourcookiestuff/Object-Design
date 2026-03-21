FROM debian:stable-slim AS builder
RUN apt-get update && apt-get install -y fpc

WORKDIR /app

COPY BubbleSort.pas .

RUN fpc BubbleSort.pas

CMD ["./BubbleSort"]