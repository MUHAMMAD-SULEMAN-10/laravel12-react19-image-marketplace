@extends('admin.layouts.app')

@section('title')
    Purchases
@endsection

@section('content')
    <div class="row my-5">
        <div class="col-md-3">
            @include('admin.layouts.sidebar')
        </div>
        <div class="col-md-9">
            <h3 class="my-3">
                Purchases
            </h3>
            <hr>
            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div
                                class="table-responsive"
                            >
                                <table
                                    class="table"
                                >
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Buyer</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Seller Part</th>
                                            <th scope="col">Platform Commission</th>
                                            <th scope="col">Payment Status</th>
                                            <th scope="col">Done</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($purchases as $key => $purchase)
                                            <tr class="">
                                                <td scope="row">
                                                    {{ $key += 1 }}
                                                </td>
                                                <td>
                                                    <img 
                                                        src="{{asset($purchase->image->file_path)}}" 
                                                        alt={{$purchase->image->title}}
                                                        class="img-fluid rounded"
                                                        height="60"
                                                        width="60"
                                                    />
                                                </td>
                                                <td>
                                                    {{ $purchase->buyer->name }}
                                                </td>
                                                <td>
                                                    ${{ $purchase->amount }}
                                                </td>
                                                <td>
                                                    ${{ $purchase->seller_amount }}
                                                </td>
                                                <td>
                                                    ${{ $purchase->platform_commission }}
                                                </td>
                                                <td>
                                                    @if ($purchase->payment_status === 'completed')
                                                        <span class="badge bg-success">
                                                            Completed
                                                        </span>
                                                    @elseif($purchase->payment_status === 'failed')
                                                        <span class="badge bg-danger">
                                                            Failed
                                                        </span>
                                                    @else
                                                        <span class="badge bg-primary">
                                                            Pending
                                                        </span>
                                                    @endif
                                                </td>
                                                <td>
                                                    {{ $purchase->created_at->diffForHumans() }}
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection