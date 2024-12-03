Feature: Google search and MoroSystem career filtering

  @dev
  Scenario: I can search for MoroSystems on Google and filter careers on the MoroSystems career page
    Given Open "google" page
    When I click on "accept-cookies-button"
    When I enter "MoroSystems" in the "search-bar-input"
    And I click on "submit-button"
   Then I am on the "google-search-list" page
    When I click on "moro-systems-result"
    Then I am on the "moro-system-home" page
    When I click on "accept-cookies-button"
    When I hover "about-us-menu-button" and click on "career-dropdown-link"
    Then I am on the "moro-system-career" page
    When I click on "filter-by-city-dropdown"
    And I choose "Brno" from select
    Then I check that "Brno" is present in all "career-by-city results"
