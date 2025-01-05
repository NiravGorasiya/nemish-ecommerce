import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="main-footer font-xs">
            <div className="row pb-30 pt-15">
                <div className="col-sm-6">
                    <script>
                        document.write(new Date().getFullYear());
                    </script>
                    &copy;, Evara - HTML Ecommerce Template .
                </div>
                <div className="col-sm-6">
                    <div className="text-sm-end">
                        All rights reserved
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer