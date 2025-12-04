@extends('admin.layouts.app')

@section('title')
    Add Category
@endsection

@section('content')
    <div class="row my-5">
        <div class="col-md-3">
            @include('admin.layouts.sidebar')
        </div>
        <div class="col-md-9">
            <h3 class="my-3">
                Add Category
            </h3>
            <hr>
            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6 mx-auto">
                                    <form action="{{route('categories.store')}}" method="post">
                                        @csrf
                                        <div class="form-floating mb-3">
                                            <input 
                                                type="text" 
                                                name="name" 
                                                class="form-control @error('name') is-invalid @enderror" 
                                                id="floatingInput" 
                                                value="{{old('name')}}"
                                                placeholder="Name*"
                                            >
                                            <label for="floatingInput">Name*</label>
                                            @error('name')
                                                <div class="invalid-feedback">
                                                    <strong>{{$message}}</strong>
                                                </div>
                                            @enderror
                                        </div>
                                        <button class="btn btn-dark w-100 py-2" type="submit">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection