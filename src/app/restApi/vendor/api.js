import { useState } from 'react';

const VendorRegistration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const apiUrl = 'https://www.dev.cleantech-mart.com/wp-json/store-vendor-registration-api/v1/register';

        // aadhaar_front and aadhaar_back are images 
        const formData = {
            username,
            email,
            password,
            meta: {
                address1,
                address2,
                country: "India",
                city,
                state,
                postcode,
                store_phone,
                aadhaar_front,
                aadhaar_back,
                "shop-license-number": shop_license_number,
                gstin,
                wcfm_register_member: "yes",
                wp_user_level: 6,

            }
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
            } else {
                console.error('Registration failed:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Vendor Registration</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default VendorRegistration;
