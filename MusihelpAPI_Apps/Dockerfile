FROM eclipse-temurin:21-jdk-jammy

# Instalamos Tesseract y dependencias gráficas mínimas (modo headless)
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-eng \
    tesseract-ocr-spa \
    libtesseract-dev \
    libleptonica-dev \
    libgtk-3-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiamos los motores y el jar de la API
COPY audiveris ./audiveris_engine
COPY musihelp_api/target/musihelpapi-0.0.1-SNAPSHOT.jar app.jar

# Configuración de carpetas y permisos
RUN mkdir -p /app/Musicxml && chmod 777 /app/Musicxml
ENV TESSDATA_PREFIX=/usr/share/tesseract-ocr/5/tessdata/

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]