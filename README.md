# API Documentation — `Items` Endpoint

## Base URL

https://restful-api-production-7859.up.railway.app/api/v1

---

## Endpoint: `GET /items`

- **Description**: Mengambil seluruh item.

- **Query Parameters** (opsional):

  - `page` (integer) — halaman pagination
  - `limit` (integer) — jumlah item per halaman
  - `search` (string) — kata kunci pencarian

- **Response Example**:

  ```json
  {
  "success": true,
  "pagination": {
    "total": 3,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  },
  "items": [
    {
      "id": "231643c5-4d46-4753-8cde-3d1a9092093a",
      "barcode": "8992696408869",
      "nama": "Nescafe Classic",
      "jenis": "Kopi",
      "berat": 120,
      "satuan": "Gram",
      "perusahaan": "Nestle",
      "harga": 63000,
      "createAt": "2025-08-29T09:14:13.959Z",
      "updatedAt": "2025-08-29T09:14:13.959Z"
    },
    ...
  ]
  }
  ```

- **ErrorHandling**

```json
{
  "status": 500,
  "success": false,
  "message": "Internal Server Error"
}
```

## Endpoint: `POST /item`

- **Description** : Menambahkan item

- **Headers** :

  - `Content-Type`: `application/json`

- **Response Example** :

```json
{
  "status": 201,
  "success": true,
  "message": "Item berhasil ditambahkan"
}
```

- **ErrorHandling**

```json
{
  "status": 409,
  "success": false,
  "message": "Data tidak lengkap"
}
```
