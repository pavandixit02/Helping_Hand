resource "aws_s3_bucket" "medical_records" {
  bucket = "helpinghand-prod-medical-records"
}

resource "aws_s3_bucket_versioning" "medical_records_versioning" {
  bucket = aws_s3_bucket.medical_records.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "medical_records_encryption" {
  bucket = aws_s3_bucket.medical_records.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
