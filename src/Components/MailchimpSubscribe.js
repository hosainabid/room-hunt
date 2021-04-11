import React from 'react';

const MailchimpSubscribe = () => {
    return (
        <div>
            <div id="mc_embed_signup">
                <form action="https://gmail.us1.list-manage.com/subscribe/post?u=fc70fcdc4fbf05075af361a97&amp;id=cfa44d70ea" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"  target="_blank" novalidate>
                    <div id="mc_embed_signup_scroll">
                        <input type="email" name="EMAIL"  id="mce-EMAIL" placeholder="email address" required />
                        <div class="clear"><input type="submit" value="Subscribe" name="subscribe" /></div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MailchimpSubscribe;