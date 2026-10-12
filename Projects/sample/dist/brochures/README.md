# Product brochures

One PDF per product, named exactly as in `src/data/productBrochures.js`.

| Product                              | File                            | Status            |
|--------------------------------------|---------------------------------|-------------------|
| Climatic Test Chamber                | climatic-test-chamber.pdf       | ✅ (PLC variant)   |
| Thermal Cyclic Chamber               | thermal-cyclic-chamber.pdf      | ✅ (controller variant) |
| Vibration Combined Climatic Chamber  | vibration-test-chamber.pdf      | ✅                |
| Battery Test Chamber                 | battery-test-chamber.pdf        | ✅                |
| Flame-Proof Hot Air Oven             | flame-proof-hot-air-oven.pdf    | ✅                |
| Thermal Shock Chamber                | thermal-shock-chamber.pdf       | ✅                |
| Walk-in Chamber                      | walk-in-chamber.pdf             | ✅                |
| Salt Spray Test Chamber              | salt-spray-test-chamber.pdf     | ⏳ company profile |
| Rain Test Chamber                    | rain-test-chamber.pdf           | ⏳ company profile |
| Tabletop Climatic Test Chamber       | tabletop-test-chamber.pdf       | ⏳ company profile |
| Dust Chamber                         | dust-chamber.pdf                | ⏳ company profile |
| Tensile Test Chamber                 | tensile-chamber.pdf             | ⏳ company profile |

To add a pending brochure: drop the PDF here with the name above, then in
`productBrochures.js` replace that product's `null` with the file name.
If a listed file is ever missing, the modal falls back to the company profile.
