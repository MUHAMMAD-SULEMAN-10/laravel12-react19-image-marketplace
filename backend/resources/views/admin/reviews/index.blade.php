@extends('admin.layouts.app')

@section('title')
    Reviews
@endsection

@section('content')
    <div class="row my-5">
        <div class="col-md-3">
            @include('admin.layouts.sidebar')
        </div>
        <div class="col-md-9">
            <h3 class="my-3">
                Reviews
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
                                            <th scope="col">Title</th>
                                            <th scope="col">Body</th>
                                            <th scope="col">Rating</th>
                                            <th scope="col">Buyer</th>
                                            <th scope="col">Approved</th>
                                            <th scope="col">Added</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($reviews as $key => $review)
                                            <tr class="">
                                                <td scope="row">
                                                    {{ $key += 1 }}
                                                </td>
                                                <td>
                                                    <img 
                                                        src="{{asset($review->image->file_path)}}" 
                                                        alt={{$review->image->title}}
                                                        class="img-fluid rounded"
                                                        height="60"
                                                        width="60"
                                                    />
                                                </td>
                                                <td>
                                                    {{ $review->title }}
                                                </td>
                                                <td>
                                                    {{ $review->body }}
                                                </td>
                                                <td>
                                                    {{ $review->rating }}
                                                </td>
                                                <td>
                                                    {{ $review->user->name }}
                                                </td>
                                                <td>
                                                    @if ($review->approved)
                                                        <span class="badge bg-success">
                                                            Approved
                                                        </span>
                                                    @else
                                                        <span class="badge bg-primary">
                                                            Pending
                                                        </span>
                                                    @endif
                                                </td>
                                                <td>
                                                    {{ $review->created_at }}
                                                </td>
                                                <td>
                                                    @if ($review->approved)
                                                        <a href="{{route('review.update', ['review' => $review->id, 'status' => 0])}}" class="btn btn-sm btn-warning mb-1">
                                                            <i class="fas fa-eye-slash"></i>
                                                        </a>
                                                    @else
                                                        <a href="{{route('review.update', ['review' => $review->id, 'status' => 1])}}" class="btn btn-sm btn-success mb-1">
                                                            <i class="fas fa-eye"></i>
                                                        </a>
                                                    @endif
                                                    <form id="{{$review->id}}" action="{{route('review.destroy', $review->id)}}" method="post">
                                                        @csrf
                                                        @method('DELETE')
                                                    </form>
                                                    <a onclick="deleteItem({{$review->id}})" class="btn btn-sm btn-danger" href="#"
                                                    > 
                                                        <i class="fas fa-trash"></i>
                                                    </a>
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