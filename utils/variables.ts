// Template variables available for use in notifications
export const email = "{{email}}"
export const phone = "{{phone}}"
export const name = "{{name}}"
export const firstName = "{{firstName}}"
export const lastName = "{{lastName}}"
export const company = "{{company}}"

// All available variables for easy reference
export const allVariables = {
  email,
  phone,
  name,
  firstName,
  lastName,
  company,
}

// Helper function to get variable display text
export const getVariablesList = () => {
  return Object.values(allVariables).join(", ")
}

// Helper function to get template variables with sample data for preview
export const getTemplateVariables = () => {
  return {
    name: "John Doe",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corp",
    orderId: "#ORD12345",
    amount: "$99.99",
    date: "December 25, 2024",
  }
}
