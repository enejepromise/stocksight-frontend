# StockSight: Real-Time Inventory & Accountability System

## Project Overview

StockSight is a modern web application designed to solve one of the biggest operational problems for small shop owners: uncertain stock levels, inaccurate sales records, and trust issues with sales staff.

StockSight provides:
##Real-time inventory updates

##Automated sales logging

##End-of-day reconciliation

##Role-based dashboards

##Alerts for low stock and discrepancies

The goal: give shop owners absolute visibility and control without being on-site.
## Problem Statement

Shop owners face daily challenges:

Inventory Pain: Manual counting, overstocking/understocking, stock loss

Money Accountability Pain: Mismatched cash vs. sales, missing records

Trust & Security Pain: Unverified sales rep activities, data manipulation risk

StockSight solves these by providing a secure, easy-to-use, tamper-proof system.

## Target Users

Primary: Small & medium shop owners (supermarkets, clothing stores, cosmetics shops, phone/accessory shops, general stores).

Secondary: Sales reps who update stock and log sales.

## Core Features

Inventory Management

Add stock upon arrival

Real-time stock reduction after sales

Low stock alerts

Immutable stock history logs

Sales Management

Daily sales entry by reps

Automatic summation & reconciliation

Owner approval for disputes

Role-Based Access & Security

Owner-only registration for sales reps

Separate dashboards (Owner vs Sales Rep)

Tamper-proof system

Reporting & Insights

Daily/weekly/monthly reports

Performance analytics

Auto-generated end-of-day summary

Multi-Device Access

Owner: mobile & laptop

Sales Rep: mobile-friendly

## Frontend Architecture & Design

Goal: Create a modern, sliding, fluid interface that communicates trust, efficiency, and professionalism.

Color Palette: Dark Green + Electric Lemon (The updated, unique palette)

Primary (Muted Forest Green / Authority): #1D4A4A – sidebar, active states, buttons

Secondary (Electric Lemon / Action): #DFFF00 – backgrounds, hover states, highlights

Text: Use soft whites (#FAFAFA) and muted grays (#B0B0B0) for readability

Design Principles

Minimalist UI with high readability (Shadcn UI base)

Sidebar navigation with Electric Lemon hover highlights

Cards for inventory and sales items with subtle shadows

Use contrast to guide attention (alerts in Dark Green + Lemon badges)

Framer Motion Integration

Framer Motion will be used to:

Slide-in/slide-out panels – inventory detail cards slide from the right on click

Smooth hover animations – buttons scale slightly with easing

Dashboard transitions – when switching tabs, cards fade + slide

Low stock alerts – pulse animation to draw attention

Example Code Snippet (React + Framer Motion):

JavaScript

import { motion } from "framer-motion";

const StockCard = ({ product }) => (
  <motion.div
    className="bg-light-surface text-text-charcoal p-4 rounded-lg shadow-lg border-l-4 border-[#1D4A4A]"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="font-bold">{product.name}</h3>
    <p>Quantity: {product.quantity}</p>
    <p>Price: ₦{product.unitPrice}</p>
  </motion.div>
);
Responsiveness

Mobile-first design using Tailwind CSS

Dynamic card layouts based on screen size

Dashboard adapts for tablet and desktop

## Backend Architecture & System Design

Goal: Build a secure, real-time, and scalable backend using BaaS (firebase) for maximum development efficiency and security.

System Overview

Supabase REST API + Realtime for updates

Role-Based Access Control (RBAC) enforced via PostgreSQL RLS

Immutable logs written to prevent tampering

High-Level Architecture

Frontend (Next.js + Shadcn UI)

    |

    | firebase API (REST / Realtime)
Firebase (PostgreSQL DB + Auth + Edge Functions)

    |

    | Logging & Analytics
Notification Service (WhatsApp / Email)

Backend Features

Authentication & Authorization: Clerk/Supabase + RLS for RBAC

Inventory Management: CRUD operations handled via Postgres Functions with logging

Sales Management: Auto-calculation, reconciliation endpoints

Low Stock Alerts: Handled by DB triggers or Supabase Edge Functions

Reporting: Aggregation queries for daily, weekly, monthly reports

Immutable Logs: Enforced via PostgreSQL RLS policies (Write-Only)

Database Schema

Tables

Users: id, name, email, passwordHash, role (OWNER/REP), shopId, timestamps

Products: id, name, costPrice, unitPrice, shopId, quantity, lowStockThreshold, timestamps

Sales: id, productId, repId, quantity, totalPrice, date, reconciliationStatus, timestamps

InventoryLogs: id, productId, changeQuantity, action (ADD/SALE), performedBy, status (PENDING/APPROVED), timestamp

Reconciliation: id, ownerId, expectedCash, actualCash, status (APPROVED/DISPUTED), timestamps

Tech Stack

Frontend: Next.js, TailwindCSS, Shadcn UI, Framer Motion, Axios, React Router, react-i18next

Backend: Firebase (PostgreSQL, Realtime, RLS)h

Authentication: JWT, bcrypt for password hashing

Real-Time Updates: Supabase Realtime

Notifications: WhatsApp API, Email Service

## Installation & Setup

We are using modern, boilerplate tools to speed up development.

Prerequisites:
Node.js (LTS version)


1. Clone the Repo:
Bash

git clone https://github.com/username/stocksight.git
cd stocksight
2. Configure Environment Variables (.env.local):
Create a .env.local file in your root directory:

# Firebase Configuration

# Other settings
# ...
3. Install Dependencies:
Bash

npm install
4. Run Development Server:
Bash

npm run dev
## Usage

Owner Dashboard: Full visibility, manage users, approve reconciliations

Sales Rep Dashboard: Add stock (pending approval), record sales, view limited metrics

Real-Time Updates: Automatic stock adjustment, alerts on low stock

Reports: Daily, weekly, monthly summaries via dashboard or WhatsApp/email

## Contributing

Fork repo, create branch, submit PR

Ensure code follows coding standards & passes tests

Document all new features in README

## License

MIT License – See LICENSE file for details
