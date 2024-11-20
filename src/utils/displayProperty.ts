import { terminal as term } from "terminal-kit";

const AMENITY_ICONS = {
  pool: "🏊",
  yard: "🌳",
  garage: "🚗",
};

export function displayProperty(filteredProperties: any[]) {
  if (filteredProperties.length > 0) {
    term.bold.green(`🌟 ${filteredProperties.length} Found Properties 🌟\n\n`);
    term.gray("   ──────────────────────────────────\n");

    filteredProperties.forEach((property, index: number) => {
      const { location, name, price, distance, amenities } = property;
      const [latitude, longitude] = location || [];
      const mapsLink = latitude && longitude
        ? `https://www.google.com/maps?q=${latitude},${longitude}`
        : null;

      const presentAmenities = Object.keys(amenities)
        .filter((amenity) => amenities[amenity])
        .map((amenity) => AMENITY_ICONS[amenity])
        .join(" ");

      term
        .cyan(`${index + 1} 🏠`)
        .bold.underline(` ${name}\n`)
        .yellow(`   💰 Price: uSd$ ${price}\n`);

      if (distance) {
        term.red(`   📍 Distance: ${distance} km\n`);
      }

      if (mapsLink) {
        term.blue(`   🌍 Location: `).underline(`${mapsLink}\n`);
      }

      if (presentAmenities) {
        term.green(`   🛠️ Amenities: ${presentAmenities}\n`);
      }

      term.gray("   ──────────────────────────────────\n");
    });

  } else {
    term.red.bold("🚫 No properties found for the selected criteria. 🚫\n");
  }
}
