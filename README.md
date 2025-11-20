# Serverless Image Sharing App on AWS

A simple serverless web app where users can upload images from a browser. Images are stored in S3, resized into thumbnails by Lambda, and metadata is saved in DynamoDB. The frontend is hosted on S3 and delivered globally through CloudFront.

---

##  Architecture

* **Frontend:** S3 (Static Website Hosting) + CloudFront
* **API Layer:** API Gateway
* **Compute:** AWS Lambda (Upload Handler + Thumbnail Generator)
* **Storage:** Amazon S3 (uploads + thumbnails)
* **Database:** DynamoDB (image metadata)
* **Trigger:** S3 Event Notification

<img width="1536" height="1024" alt="ChatGPT Image Nov 20, 2025, 02_24_01 PM" src="https://github.com/user-attachments/assets/76a59ac0-7f51-4e84-98bf-6874d14a2e20" />

---

##  Implementation Steps

### 1. Create S3 Buckets

* **frontend-bucket:** enable static website hosting
* **images-bucket:** create `uploads/` and `thumbnails/` directories

Upload your frontend (HTML, CSS, JS) to the frontend bucket.

---

### 2. Set Up CloudFront

* Create a CloudFront distribution pointing to the frontend bucket
* Enable OAC or keep bucket public for testing
* Copy CloudFront URL to access the site

---

### 3. Create DynamoDB Table

Create a table:

```
Name: Images
Primary key: filename (String)
```

Stores original & thumbnail URLs with timestamps.

---

### 4. Create Upload Lambda

Responsible for:

* Receiving Base64 image from API Gateway
* Decoding and saving to S3 under `uploads/`
* Returning the generated filename

Add environment variable:

```
IMAGES_BUCKET = your-images-bucket
```

---

### 5. Configure API Gateway

Create:

```
POST /upload
```

Integrate with Upload Lambda.
Enable CORS for browser requests.

Update the frontend JS file with the API endpoint.

---

### 6. Create Thumbnail Lambda

Triggered when a new object is uploaded:

* Downloads original image
* Generates thumbnail
* Uploads to `thumbnails/`
* Saves metadata in DynamoDB

Add environment variables:

```
IMAGES_BUCKET
DDB_TABLE
```

---

### 7. Add S3 Event Notification

On the **images bucket**:

* Event: `ObjectCreated`
* Prefix: `uploads/`
* Target: Thumbnail Lambda

---

### 8. Test End-to-End

* Open frontend
* Upload an image
* Validate:

  * `uploads/` → original image
  * `thumbnails/` → resized image
  * DynamoDB → metadata entry
  * API returns success
  * CloudFront displays the web app

---

## 🛠️ Tech Stack

* HTML, CSS, JavaScript
* AWS Lambda (Python or Node.js)
* S3, CloudFront, API Gateway, DynamoDB
* IAM for access control

---

##  Future Enhancements

* Add Cognito authentication
* Add gallery view endpoint
* Add AWS Rekognition tags
* Add presigned URL uploads

---
