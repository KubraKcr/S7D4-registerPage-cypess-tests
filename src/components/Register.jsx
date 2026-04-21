import { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardHeader, FormFeedback, CardFooter } from 'reactstrap';
import axios from 'axios';

 export const errorMessages = {
    ad: "Adınız en az 3 karakter olmalıdır",
    soyad: "Soyadınız en az 2 karakter olmalıdır",
    email: "Geçerli bir email adresi giriniz",
    password: "En az 8 karakter, en az bir büyük harf, bir küçük harf ve bir sayı içermelidir"
  };

 export default function Register() {
  const initialValues = {
    ad: "",
    soyad: "",
    email: "",
    password: ""
  };

  // State'ler her zaman en üstte olmalı
  const [formData, setFormData] = useState(initialValues);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    ad: false,
    soyad: false,
    email: false,
    password: false
  });


  // Formun genel geçerlilik kontrolü (Buton aktifliği için)
  useEffect(() => {
    const isAdValid = formData.ad.trim().length >= 3;
    const isSoyadValid = formData.soyad.trim().length >= 3;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/.test(formData.password);

    if (isAdValid && isSoyadValid && isEmailValid && isPasswordValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]); // formData her değiştiğinde kontrol et

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Hata mesajlarını anlık yönetelim
    if (name === "ad" || name === "soyad") {
      setErrors({ ...errors, [name]: value.trim().length < 3 });
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({ ...errors, [name]: !emailRegex.test(value) });
    }

    if (name === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
      setErrors({ ...errors, [name]: !passwordRegex.test(value) });
    }
  };
  const [id, setId] = useState(null); // Yeni state ekledik
 const handleSubmit = (e) => {
    e.preventDefault();
     setFormData(initialValues); // Formu sıfırla
    // 1. Durum: Form geçersizse fonksiyondan çık
    if (!isValid) {
      console.warn("Form henüz geçerli değil!");
      return; 
    }

// 2. POST İsteği (Axios ile)
// Not: Burada da 'x-api-key' eklemelisin, yoksa yine 401 hatası alırsın.
axios.post('https://reqres.in/api/users', formData, {
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres_c6e98005565647c4aea01c00eccecbc8' // Bu satır eksikti!
    }
})
.then(response => {
  setId(response.data.id); // Sunucudan dönen ID'yi state'e kaydet
  setFormData(initialValues); // Formu sıfırla
    console.log("Başarılı! Kaydedilen Kullanıcı:", response.data);
})
.catch(error => {
    if (error.response) {
        // Sunucu hata döndürdü (Muhtemelen hala x-api-key eksik diyor)
        console.log("Hata Verisi:", error.response.data);
    } else {
        console.log("Bağlantı Hatası:", error.message);
    }
});
  }; 
  return (
    <Card className="m-4">
      <CardHeader>Kayıt Ol</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="ad">AD:</Label>
            <Input
              id="ad"
              name="ad"
              placeholder="Adınızı giriniz"
              type="text"
              onChange={handleChange}
              value={formData.ad}
              invalid={errors.ad}
            />
            <FormFeedback>{errorMessages.ad}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for="soyad">SOYAD:</Label>
            <Input
              id="soyad"
              name="soyad"
              placeholder="Soyadınızı giriniz"
              type="text"
              onChange={handleChange}
              value={formData.soyad}
              invalid={errors.soyad}
            />
            <FormFeedback>{errorMessages.soyad}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for="email">EMAIL:</Label>
            <Input
              id="email"
              name="email"
              placeholder="Email giriniz"
              type="email"
              onChange={handleChange}
              value={formData.email}
              invalid={errors.email}
            />
            <FormFeedback>{errorMessages.email}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for="password">PASSWORD:</Label>
            <Input
              id="password"
              name="password"
              placeholder="Şifre giriniz"
              type="password"
              onChange={handleChange}
              value={formData.password}
              invalid={errors.password}
            />
            <FormFeedback>{errorMessages.password}</FormFeedback>
          </FormGroup>

          <Button color="primary" disabled={!isValid} type="submit">
            Kayıt Ol!
          </Button>
        </Form>
      </CardBody>
      <CardFooter>
        {id && <p className="text-success mt-2">Kullanıcı başarıyla kaydedildi! ID: {id}</p>}
      </CardFooter>

</Card>
  );
}