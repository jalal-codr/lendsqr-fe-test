import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { describe, it, expect } from "vitest";

describe("Dashboard Layout", () => {
  it("opens the sidebar when hamburger is clicked", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    // 1. Find the menu button (using the aria-label you added!)
    const menuBtn = screen.getByLabelText(/open menu/i);
    
    // 2. Click it
    fireEvent.click(menuBtn);

    // 3. Check if the sidebar now has the 'open' class
    const sidebar = screen.getByRole("complementary"); // <aside> tag
    expect(sidebar).toHaveClass(/open/);
  });
});