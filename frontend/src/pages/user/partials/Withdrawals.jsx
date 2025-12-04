import React from 'react'
import { useSelector } from 'react-redux'

export default function Withdrawals() {
    const { user } = useSelector(state => state.user)

    return (
        <div className="card mb-3">
            <div className="card-header bg-white">
                <h5 className="mt-2">
                    Withdrawals
                </h5>
            </div>
            <div className="card-body">
                {
                    user?.withdrawals?.length > 0 ? 
                        <div
                            className="table-responsive"
                        >
                            <table
                                className="table table-bordered"
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        user?.withdrawals?.map(withdrawal => (
                                            <tr key={withdrawal.id}>
                                                <td>{withdrawal.amount}</td>
                                                <td>
                                                    <span className={`badge bg-${withdrawal.status === 'pending' ? 'primary' : withdrawal.status === 'approved' ? 'success' : 'danger'}`}>
                                                        {withdrawal.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    :
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <div className="alert alert-info">
                                No withdrawals yet!
                            </div>
                        </div>
                    </div>    
                }
            </div>
        </div>
    )
}
