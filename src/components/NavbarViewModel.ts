import BaseViewModel from "./BaseViewModel";

export default class NavbarViewModel extends BaseViewModel{
    constructor() {
        super();
        this.template = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <!-- Search Bar -->
    <form class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>

    <!-- Settings Dropdown -->
    <div class="dropdown ms-auto">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        Settings
      </button>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
        <li><a class="dropdown-item" href="/profile">Profile</a></li>
        <li><a class="dropdown-item" href="/logout">Logout</a></li>
      </ul>
    </div>
  </div>
</nav>
        `
    }
}