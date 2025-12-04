import React from 'react'
import { useSelector } from 'react-redux'
import Purchases from './partials/Purchases'
import Images from './partials/Images'
import Earnings from './partials/Earnings'
import Withdrawals from './partials/Withdrawals'

export default function Profile() {
    const { user } = useSelector(state => state.user)

    return (
        <div className="row mt-5">
            <div className="col-md-3">
                <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button className="nav-link active" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</button>
                    <button className="nav-link" id="v-pills-purchases-tab" data-bs-toggle="pill" data-bs-target="#v-pills-purchases" type="button" role="tab" aria-controls="v-pills-purchases" aria-selected="true">Purchases</button>
                    <button className="nav-link" id="v-pills-images-tab" data-bs-toggle="pill" data-bs-target="#v-pills-images" type="button" role="tab" aria-controls="v-pills-images" aria-selected="true">Images</button>
                    <button className="nav-link" id="v-pills-earnings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-earnings" type="button" role="tab" aria-controls="v-pills-earnings" aria-selected="false">Earnings</button>
                    <button className="nav-link" id="v-pills-withdrawals-tab" data-bs-toggle="pill" data-bs-target="#v-pills-withdrawals" type="button" role="tab" aria-controls="v-pills-withdrawals" aria-selected="false">Withdrawals</button>
                </div>
            </div>
            <div className="col-md-9">
                <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabIndex="0">
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <ul className="list-group">
                                    <li className="list-group-item border border-dark border-3 mb-1">
                                        <i className="bi bi-person"></i> { user?.name }
                                    </li>
                                    <li className="list-group-item border border-dark border-3 mb-1">
                                        <i className="bi bi-envelope"></i> { user?.email }
                                    </li>
                                    {
                                        user?.paypal_email &&                                    
                                            <li className="list-group-item border border-dark border-3 mb-1">
                                                <i className="bi bi-paypal"></i> { user?.paypal_email }
                                            </li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="v-pills-purchases" role="tabpanel" aria-labelledby="v-pills-purchases-tab" tabIndex="0">
                        <Purchases />
                    </div>
                    <div className="tab-pane fade" id="v-pills-images" role="tabpanel" aria-labelledby="v-pills-images-tab" tabIndex="0">
                        <Images />
                    </div>
                    <div className="tab-pane fade" id="v-pills-earnings" role="tabpanel" aria-labelledby="v-pills-earnings-tab" tabIndex="0">
                        <Earnings />
                    </div>
                    <div className="tab-pane fade" id="v-pills-withdrawals" role="tabpanel" aria-labelledby="v-pills-withdrawals-tab" tabIndex="0">
                        <Withdrawals />
                    </div>
                </div>
            </div>
        </div>
    )
}
