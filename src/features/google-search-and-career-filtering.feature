Feature: Google search and MoroSystem career filtering

  @dev
  Scenario: I can search for MoroSystems on Google and filter careers on the MoroSystems career page
    Given Open "google" page
    When I click on "accept-cookies-button"
    When I enter "github" in the "search-bar-input"
    And I click on "submit-button"
    Then I am on the "google-search-list" page
