import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <section className="flex w-full h-screen items-center justify-center page_404 py-10 bg-white font-serif">
            <div className="container mx-auto">
                <div className="row flex justify-center">    
                    <div className="col-sm-12 text-center">
                        <div className="four_zero_four_bg h-96 bg-no-repeat bg-center" style={{ backgroundImage: "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)" }}>
                            <h1 className="text-8xl">404</h1>
                        </div>
                        
                        <div className="contant_box_404 mt-[-50px]">
                            <h3 className="text-3xl">
                                Looks like you're lost
                            </h3>
                            
                            <p className="text-lg">The page you are looking for is not available!</p>
                            
                            <Link to="/registration" className="link_404 text-white py-2 px-4 bg-green-600 mt-5 inline-block">
                                Go to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page404;
