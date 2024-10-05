import React, { useState } from 'react';


interface OrderFormProps {
    onSubmit: (orderDetails: { tableNumber: string; quantity: number }) => void;
    onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, onClose }) => {
    const [tableNumber, setTableNumber] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ tableNumber, quantity });
    };

    return (
        <div className="order-form-overlay">
            <div className="order-form">
                <h2>Place Your Order</h2>
                <form onSubmit={handleSubmit}>
                    <div className='table-num'>
                        <label htmlFor="tableNumber">Table Number:</label>
                        <input 
                            type="number"
                            id="tableNumber"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className='quantity'>
                        <label htmlFor="quantity">Quantity:</label>
                        <input 
                            type="number"
                            id='quantity'
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            min="1"
                            required
                        />
                    </div>
                    <div className='form-actions'>
                        <button type="button" onClick={onClose}>Close</button>
                        <button type="submit">Place Order</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderForm;