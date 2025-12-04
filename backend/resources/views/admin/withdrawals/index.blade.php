@extends('admin.layouts.app')

@section('title')
    Withdrawals
@endsection

@section('content')
    <div class="row my-5">
        <div class="col-md-3">
            @include('admin.layouts.sidebar')
        </div>
        <div class="col-md-9">
            <h3 class="my-3">
                Withdrawals
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
                                            <th scope="col">Seller</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Requested</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($withdrawals as $key => $withdrawal)
                                            <tr class="">
                                                <td scope="row">
                                                    {{ $key += 1 }}
                                                </td>
                                                <td>
                                                    {{ $withdrawal->seller->name }}
                                                </td>
                                                <td>
                                                    ${{ $withdrawal->amount}}
                                                </td>
                                                <td>
                                                    @if ($withdrawal->status === 'approved')
                                                        <span class="badge bg-success">
                                                            Approved
                                                        </span>
                                                    @elseif($withdrawal->status === 'rejected')
                                                        <span class="badge bg-danger">
                                                            Rejected
                                                        </span>
                                                    @else
                                                        <span class="badge bg-primary">
                                                            Pending
                                                        </span>
                                                    @endif
                                                </td>
                                                <td>
                                                    {{ $withdrawal->created_at->diffForHumans() }}
                                                </td>
                                                <td>
                                                    @if ($withdrawal->status === 'approved')
                                                        <a href="{{route('withdrawal.update', ['withdrawal' => $withdrawal->id, 'status' => 'rejected'])}}" class="btn btn-sm btn-warning mb-1">
                                                            <i class="fas fa-eye-slash"></i>
                                                        </a>
                                                    @endif
                                                    @if ($withdrawal->status === 'rejected')
                                                        <a href="{{route('withdrawal.update', ['withdrawal' => $withdrawal->id, 'status' => 'approved'])}}" class="btn btn-sm btn-success mb-1">
                                                            <i class="fas fa-eye"></i>
                                                        </a>
                                                    @endif
                                                    @if ($withdrawal->status === 'pending')
                                                        <a href="{{route('withdrawal.update', ['withdrawal' => $withdrawal->id, 'status' => 'approved'])}}" class="btn btn-sm btn-success mb-1">
                                                            <i class="fas fa-check"></i>
                                                        </a>
                                                        <a href="{{route('withdrawal.update', ['withdrawal' => $withdrawal->id, 'status' => 'rejected'])}}" class="btn btn-sm btn-danger mb-1">
                                                            <i class="fas fa-times"></i>
                                                        </a>
                                                    @endif
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