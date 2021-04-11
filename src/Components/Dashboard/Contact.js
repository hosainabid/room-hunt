import React from 'react';

const Contact = () => {
    return (
        <div className="text-center ">
            <h1>CONTACT US</h1> <hr/>
            <div className=" form">
                <form action="https://formspree.io/f/xknknnqz" method="post">
                    <div className="form-group">
                        {/* <label for="Client">Name</label> */}
                        <input type="text" className="form-control " id="Client" name="name" placeholder="Enter your name" required />
                    </div>
                    <div className="form-group">
                        {/* <label for="email">Email Address</label> */}
                        <input type="email" className="form-control " id="email" name="email" placeholder="Enter your email address" required />
                    </div>
                    <div className="form-group">
                        {/* <label for="email">Email Address</label> */}
                        <input type="number" className="form-control " id="mobile" name="mobile" placeholder="Enter your mobile number" required />
                    </div>
                    <div className="form-group">
                        {/* <label for="MSG">Your Message</label> */}
                        <textarea className="form-control " id="MSG" rows="6" name="message" placeholder="Your message..." required></textarea>
                    </div>
                    <button type="submit" className="btn btn-info ">Send Email</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;