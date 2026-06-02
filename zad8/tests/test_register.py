import time
import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from conftest import BASE_URL

def get_error(driver):
    return WebDriverWait(driver, 5).until(
        EC.visibility_of_element_located((By.XPATH, "//p[contains(@style,'red')]"))
    )

def fill_form(driver, name='', email='', password='', confirm=''):
    driver.get(f"{BASE_URL}/register")
    if name:
        driver.find_element(By.XPATH, "//input[@placeholder='Imię']").send_keys(name)
    if email:
        driver.find_element(By.XPATH, "//input[@placeholder='Email']").send_keys(email)
    if password:
        driver.find_element(By.XPATH, "//input[@placeholder='Hasło']").send_keys(password)
    if confirm:
        driver.find_element(By.XPATH, "//input[@placeholder='Potwierdź hasło']").send_keys(confirm)
    driver.find_element(By.XPATH, "//button[contains(text(),'Zarejestruj')]").click()

def test_empty_form_shows_error(driver):
    fill_form(driver)
    assert get_error(driver).text == "Wszystkie pola są wymagane"

def test_invalid_email_shows_error(driver):
    fill_form(driver, name="Jan", email="niepoprawnyemail", password="haslo123", confirm="haslo123")
    assert get_error(driver).text == "Nieprawidłowy format email"

def test_short_password_shows_error(driver):
    fill_form(driver, name="Jan", email="jan@example.com", password="abc", confirm="abc")
    assert get_error(driver).text == "Hasło musi mieć minimum 6 znaków"

def test_passwords_not_matching_shows_error(driver):
    fill_form(driver, name="Jan", email="jan@example.com", password="haslo123", confirm="inne")
    assert get_error(driver).text == "Hasła nie są identyczne"

def test_valid_registration_redirects(driver):
    fill_form(driver, name="Jan Kowalski", email=f"jan{int(time.time())}@example.com", password="haslo123", confirm="haslo123")
    WebDriverWait(driver, 10).until(EC.url_to_be(f"{BASE_URL}/"))
    assert driver.current_url == f"{BASE_URL}/"