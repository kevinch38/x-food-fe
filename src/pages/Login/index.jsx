import LogoLogin from '../../assets/images/logo-login.png'
import InnerShape from '../../assets/images/shape.png'
import ShapeCircle from '../../assets/images/shape-circle.png'

function Login() {
    return (
        <div>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-8">
                            <div className="card" style={{borderRadius: 24}}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src={InnerShape} alt={'InnerShape'} className='img-fluid position-absolute'
                                             style={{left: 174, width: '40%'}}/>
                                        <img src={ShapeCircle} alt={'ShapeCircle'}
                                             className='img-fluid position-absolute'
                                             style={{width: '20%', bottom: -60, left: -60}}/>
                                        <img src={LogoLogin} alt={'Logo'} className='img-fluid'
                                             style={{borderTopLeftRadius: 24, borderBottomLeftRadius: 24}}/>
                                    </div>

                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black text-center">
                                            <div className="container"
                                                 style={{paddingTop: 30, paddingBottom: 30}}>
                                                <form>
                                                    <div
                                                        className="d-flex align-items-center mb-3 pb-1 justify-content-center">
                                                        <span className="h1 fw-semibold" style={{
                                                            fontSize: 26,
                                                            color: '#F08D18'
                                                        }}>Sign In to X-FOOD</span>
                                                    </div>

                                                    <div className="input-group input-group-lg flex-nowrap mb-3">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-envelope"></i>
                                                    </span>
                                                        <input type="email" className="form-control"
                                                               style={{height: 40}}
                                                               placeholder="Email"/>
                                                    </div>

                                                    <div className="input-group input-group-lg flex-nowrap mb-5">
                                                    <span className="input-group-text bg-white">
                                                        <i className="bi bi-lock"></i>
                                                    </span>
                                                        <input type="password" className="form-control"
                                                               style={{height: 40}}
                                                               placeholder="Password"/>
                                                    </div>

                                                    <div className="pt-1 mb-4">
                                                        <button
                                                            className="btn btn-primary btn-lg btn-block text-uppercase border-0 py-3"
                                                            style={{
                                                                backgroundColor: '#F08D18',
                                                                borderRadius: 24,
                                                                paddingLeft: 59,
                                                                paddingRight: 59
                                                            }}
                                                            type="button">Sign In
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;
