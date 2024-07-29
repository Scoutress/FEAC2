// src/client/components/calendar/Calendar.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CalendarComponent from "./Calendar";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";

// Setup for i18n (You might need to adjust this based on your i18n setup)
i18n.init({
  lng: "en",
  resources: {
    en: {
      translation: {
        MONDAY: "Mon",
        TUESDAY: "Tue",
        WEDNESDAY: "Wed",
        THURSDAY: "Thu",
        FRIDAY: "Fri",
        SATURDAY: "Sat",
        SUNDAY: "Sun",
        JANUARY: "January",
        FEBRUARY: "February",
        MARCH: "March",
        APRIL: "April",
        MAY: "May",
        JUNE: "June",
        JULY: "July",
        AUGUST: "August",
        SEPTEMBER: "September",
        OCTOBER: "October",
        NOVEMBER: "November",
        DECEMBER: "December",
      },
    },
  },
});

describe("CalendarComponent", () => {
  it("renders the calendar component", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CalendarComponent onDateChange={() => {}} />
      </I18nextProvider>
    );

    // Check if days of the week are rendered
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Tue")).toBeInTheDocument();
    expect(screen.getByText("Wed")).toBeInTheDocument();
    expect(screen.getByText("Thu")).toBeInTheDocument();
    expect(screen.getByText("Fri")).toBeInTheDocument();
    expect(screen.getByText("Sat")).toBeInTheDocument();
    expect(screen.getByText("Sun")).toBeInTheDocument();

    // Check if calendar days are rendered (assuming the current month has at least 31 days)
    for (let i = 1; i <= 31; i++) {
      expect(screen.getByText(`${i}`)).toBeInTheDocument();
    }
  });
});