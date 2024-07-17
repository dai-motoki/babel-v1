# ファイル操作のテスト
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_upload_file():
    files = {"file": ("test.txt", b"Test content", "text/plain")}
    response = client.post("/files/upload", files=files)
    assert response.status_code == 200
    assert "filename" in response.json()
    assert "size" in response.json()

def test_list_files():
    response = client.get("/files/list")
    assert response.status_code == 200
    assert "files" in response.json()

def test_get_file_content():
    # First, upload a file
    files = {"file": ("test_content.txt", b"Test content", "text/plain")}
    upload_response = client.post("/files/upload", files=files)
    assert upload_response.status_code == 200

    # Then, get its content
    content_response = client.get("/files/content/test_content.txt")
    assert content_response.status_code == 200
    assert content_response.json()["content"] == "Test content"

def test_edit_file():
    # First, upload a file
    files = {"file": ("test_edit.txt", b"Line 1
Line 2
Line 3", "text/plain")}
    upload_response = client.post("/files/upload", files=files)
    assert upload_response.status_code == 200

    # Then, edit it
    edit_response = client.put("/files/edit/test_edit.txt", json={"line_number": 2, "new_content": "Edited Line 2"})
    assert edit_response.status_code == 200

    # Verify the edit
    content_response = client.get("/files/content/test_edit.txt")
    assert content_response.status_code == 200
    assert content_response.json()["content"] == "Line 1
Edited Line 2
Line 3"

def test_append_to_file():
    # First, upload a file
    files = {"file": ("test_append.txt", b"Initial content", "text/plain")}
    upload_response = client.post("/files/upload", files=files)
    assert upload_response.status_code == 200

    # Then, append to it
    append_response = client.post("/files/append/test_append.txt?content=Appended content")
    assert append_response.status_code == 200

    # Verify the append
    content_response = client.get("/files/content/test_append.txt")
    assert content_response.status_code == 200
    assert content_response.json()["content"] == "Initial contentAppended content"

def test_delete_file():
    # First, upload a file
    files = {"file": ("test_delete.txt", b"Test delete content", "text/plain")}
    upload_response = client.post("/files/upload", files=files)
    assert upload_response.status_code == 200

    # Then, delete it
    delete_response = client.delete("/files/delete/test_delete.txt")
    assert delete_response.status_code == 200
    assert delete_response.json()["message"] == "File test_delete.txt deleted successfully"

    # Try to get content of the deleted file (should fail)
    content_response = client.get("/files/content/test_delete.txt")
    assert content_response.status_code == 404


# 追記された内容:
# ファイル操作のテスト
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_upload_file():
    files = {"file": ("test.txt", b"Test content", "text/plain")}
    response = client.post("/files/upload", files=files)
    assert response.status_code == 200
    assert "filename" in response.json()
    assert "size" in response.json()

def test_list_files():
    response = client.get("/files/list")
    assert response.status_code == 200
    assert "files" in response.json()

def test_get_file_content():
    # First, upload a file
    files = {"file": ("test_content.txt", b"Test content", "text/plain")}
    upload_response = client.post("/files/upload", files=files)
    assert upload_response.status_code == 200

    # Then, get its content
    content_response = client.get("/files/content/test_content.txt")
    assert content_response.status_code == 200
    assert content_response.json()["content"] == "Test content"

def test_edit_file():
    # First, upload a file
    files = {"file": ("test_edit.txt", b"Line 1
Line 2
Line 3", "text/plain")}
    upload_response = client.post("/files/upload", files=files)
    assert upload_response.status_code == 200

    # Then, edit it
    edit_response = client.put("/files/edit/test_edit.txt", json={"line_number": 2, "new_content": "Edited Line 2"})
    assert edit_response.status_code == 200

    # Verify the edit
    content_response = client.get("/files/content/test_edit.txt")
    assert content_response.status_code == 200
    assert content_response.json()["content"] == "Line 1
Edited Line 2
Line 3"

def test_append_to_file():
    # First, upload a file
    files = {"file": ("test_append.txt", b"Initial content", "text/plain")}
    upload_response = client.post("/files/upload", files=files)
    assert upload_response.status_code == 200

    # Then, append to it
    append_response = client.post("/files/append/test_append.txt?content=Appended content")
    assert append_response.status_code == 200

    # Verify the append
    content_response = client.get("/files/content/test_append.txt")
    assert content_response.status_code == 200
    assert content_response.json()["content"] == "Initial contentAppended content"

def test_delete_file():
    # First, upload a file
    files = {"file": ("test_delete.txt", b"Test delete content", "text/plain")}
    upload_response = client.post("/files/upload", files=files)
    assert upload_response.status_code == 200

    # Then, delete it
    delete_response = client.delete("/files/delete/test_delete.txt")
    assert delete_response.status_code == 200
    assert delete_response.json()["message"] == "File test_delete.txt deleted successfully"

    # Try to get content of the deleted file (should fail)
    content_response = client.get("/files/content/test_delete.txt")
    assert content_response.status_code == 404
