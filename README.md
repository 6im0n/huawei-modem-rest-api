# 💬 Huawei LTE modem rest API

<p align="center">
<img width="1200" height="400" src="https://www.etsi.org/images/banners/page/Technologies-ICT-standardization-5G-NFV-MEC-AI-IoT-TETRA-DECT-smart-cities-M2M-cyber-security-internet-of-things-quantum-cryptography-ITS-ehealth-digital-signature-radio-regulation-harmonised-standard.jpg">
</p>

## **ℹ️ About**
This project aims to provide a lightweight REST API interface to interact with Huawei LTE modems, allowing users to manage, monitor, and configure their modem easily via HTTP requests.

## **📑 Project Info**

### **📜 Description**
Huawei LTE modem rest API, bridges the gap between Huawei LTE modem functionalities and modern web-based applications by creating a robust REST API. This API will expose endpoints to perform operations like:

- Monitoring signal strength and network status.
- Sending and receiving SMS.
- Managing connections (e.g., connecting/disconnecting from networks).
- Retrieving modem configurations.

### ⚠️ MUST
```
- The API must support token-based authentication to secure endpoints.
- The API must handle common errors gracefully and return appropriate HTTP status codes.
- The API must be compatible with Huawei modem models such as B525, E3372, etc.
- Ensure minimal dependencies and focus on lightweight deployment.
- Provide comprehensive documentation for all endpoints.
```

> [!NOTE]
> This project will require access to a Huawei LTE modem for testing and development.

## **⚙️ Technology Notes**
- **Programming Language:** TypeScript
- **Framework:** NestJS for building the REST API.
- **Libraries/Modules:**
  ```WIP```
- **Environment:** Docker for containerization (optional).
- **Documentation:** Auto-generated API docs via Swagger module in NestJS.

## **💍 Contributors:**
### **👨‍💻 Developer:**
- [Simon GANIER-LOMBARD](https://github.com/6im0n)

## **🎮 How to Use:**
1. **Clone the repository:**
   ```bash
   git clone https://github.com/6im0n/huawei-modem-rest-api
   huawei-modem-rest-api
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the server:**
   ```bash
   npm run start:dev
   ```
4. **Access the API documentation:**
   Navigate to `http://127.0.0.1:3000/api` to explore the available endpoints.

5. **Test endpoints:**
   Use tools like `curl` or Postman to test API functionalities.

## **💐 Contribute:**
We welcome contributions! Here's how you can help:
- Report bugs or suggest features via GitHub issues.
- Submit pull requests to improve code or documentation.
- Share feedback to make it better.

Feel free to explore the code, contribute, or provide feedback!
