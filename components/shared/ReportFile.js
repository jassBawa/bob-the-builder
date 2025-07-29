import useCurrentUser from '@/hooks/useCurrentUser';
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import React from 'react';

Font.register({
  family: 'Times-Roman',
  src: 'https://fonts.gstatic.com/s/timesnewroman/v11/rP2DpRRLCen5dL56PH3ysEJ-01g7LqGBNeWn6u11DC8.ttf',
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Times-Roman', // Set font family
  },
  section: {
    marginBottom: 20,
  },
  sectionMainHeading: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  ReportHeader: {
    fontSize: 32,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  notApplicableText: {
    color: 'red', //
  },
  sectionHeader: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'semibold',
    textTransform: 'capitalize',
  },
  subtopic: {
    fontSize: 14,
    fontWeight: 'semibold',
    textTransform: 'capitalize',
  },
  remarks: {
    backgroundColor: 'red',
  },
  table: {
    display: 'table',
    border: '1px solid black',
    width: 'auto',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    // border: '1px solid black',
    borderTopWidth: 1,
  },
  tableColHeader: {
    width: '40%',
    borderRight: '1px solid black',
    borderTopWidth: '1px solid black',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 5,
    textTransform: 'capitalize',
    fontFamily: 'Times-Roman', // Set font family
    fontSize: 12,
  },
  tableCol: {
    width: '60%',
    borderTopWidth: 1,
    fontSize: 12,
    padding: 5,
    textTransform: 'capitalize',

    fontSize: 12,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    marginLeft: 5,
  },
  image: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    marginVertical: 5,
  },
  watermark: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    transform: 'rotate(-45deg)', // Added rotation
    opacity: 0.4,
    fontSize: 30,
    color: 'red',
    textAlign: 'center',
    zIndex: 2,
    pointerEvents: 'none',
  },
  notApplicable: {
    fontSize: 14,
    color: 'red',
  },
  notAvailableText: {
    color: 'red', // Change to your desired color
  },
});

// Create Document Component
const MyDocument = ({ reportData, role = 'officer' }) => {
  const user = useCurrentUser(role);
  console.log(reportData);
  if (
    !reportData ||
    !reportData.generalObservationsData ||
    !reportData.structuralObservationsData ||
    !reportData.buildingData ||
    !reportData.ndtdata
  ) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text>No report found...</Text>
        </Page>
      </Document>
    );
  }

  const generalObservations = reportData.generalObservationsData;
  const buildingData = reportData.buildingData;
  const structuralData = reportData.structuralObservationsData;
  const ndtData = reportData.ndtdata;
  const sortedNdtdata = sortObjectKeysRecursively(ndtData);

  console.log(sortedNdtdata);

  // Helper function to render table rows with potential images
  const renderTableRow = (field, fieldValue) => {
    if (field === 'photo' && fieldValue) {
      return (
        <View style={styles.tableRow} key={field} classroom="border">
          <Text style={styles.tableColHeader} className="last:border-b-0">
            {field}
          </Text>
          <Image style={styles.tableCol} src={fieldValue} alt="field" />
        </View>
      );
    }
    return (
      fieldValue && (
        <View style={styles.tableRow} key={field}>
          <Text style={styles.tableColHeader} className="last:border-b-0">
            {field}
          </Text>
          <Text style={styles.tableCol}>{fieldValue}</Text>
        </View>
      )
    );
  };

  const renderStructuralData = (data, styles) => {
    return Object.entries(data).map(([key, value]) => {
      if (hasData(value)) {
        return (
          <View key={key} style={styles.table}>
            <Text style={styles.sectionHeader}>{key}</Text>
            {Object.entries(value).map(([subKey, subValue]) => {
              if (hasData(subValue)) {
                const hasFieldValues = Object.values(subValue).some(
                  (fieldValue) => hasData(fieldValue)
                );

                if (!hasFieldValues) {
                  return null;
                }

                return (
                  <View key={subKey} style={styles.table}>
                    {subKey && <Text style={styles.subtopic}>{subKey}</Text>}
                    {Object.entries(subValue).map(([field, fieldValue]) => {
                      if (hasData(fieldValue)) {
                        return renderTableRow(field, fieldValue, styles);
                      }
                      return null;
                    })}
                  </View>
                );
              }
              return null;
            })}
          </View>
        );
      }
      return null;
    });
  };

  return (
    <Document>
      <Page style={styles.page}>
        {user && <Text style={styles.watermark}>{user?.email}</Text>}
        <View style={styles.section}>
          <Text style={styles.ReportHeader}>Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Building ID</Text>
              <Text style={styles.tableCol}>{reportData.buildingId}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Timestamp</Text>
              <Text style={styles.tableCol}>
                {new Date(reportData.timestamp).toLocaleString()}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>User ID</Text>
              <Text style={styles.tableCol}>{reportData.userId}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionMainHeading}>General Observations</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Age of Building</Text>
              <Text
                style={[
                  styles.tableCol,
                  !generalObservations.ageOfBuilding &&
                    styles.notApplicableText,
                ]}
              >
                {generalObservations.ageOfBuilding || 'Not available'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Number of Stories</Text>
              <Text
                style={[
                  styles.tableCol,
                  !generalObservations.numberOfStories &&
                    styles.notApplicableText,
                ]}
              >
                {generalObservations.numberOfStories || 'Not available'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Date of Inspection</Text>
              <Text
                style={[
                  styles.tableCol,
                  !generalObservations.dateOfInspection &&
                    styles.notApplicableText,
                ]}
              >
                {generalObservations.dateOfInspection || 'Not available'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Type of Structure</Text>
              <Text
                style={[
                  styles.tableCol,
                  !generalObservations.typeOfStructure &&
                    styles.notApplicableText,
                ]}
              >
                {generalObservations.typeOfStructure || 'Not available'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Location</Text>
              <Text
                style={[
                  styles.tableCol,
                  !generalObservations.location && styles.notApplicableText,
                ]}
              >
                {generalObservations.location || 'Not available'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>
                Architectural Plan Available
              </Text>
              <Text style={[styles.tableCol]}>
                {generalObservations.architecturalPlanAvailable ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Name of Structure</Text>
              <Text
                style={[
                  styles.tableCol,
                  !generalObservations.nameOfStructure &&
                    styles.notApplicableText,
                ]}
              >
                {generalObservations.nameOfStructure || 'Not available'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Size of Building</Text>
              <Text
                style={[
                  styles.tableCol,
                  !generalObservations.sizeOfBuilding &&
                    styles.notApplicableText,
                ]}
              >
                {generalObservations.sizeOfBuilding || 'Not available'}
              </Text>
            </View>
          </View>
        </View>
      </Page>
      <Page style={styles.page}>
        {user && <Text style={styles.watermark}>{user?.email}</Text>}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Building Details</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Building Name</Text>
              <Text
                style={[
                  styles.tableCol,
                  !buildingData.buildingName && styles.notAvailableText,
                ]}
              >
                {buildingData.buildingName || 'Not available'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Number of Stories</Text>
              <Text
                style={[
                  styles.tableCol,
                  !buildingData.noOfStories && styles.notAvailableText,
                ]}
              >
                {buildingData.noOfStories || 'Not available'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Year of Construction</Text>
              <Text
                style={[
                  styles.tableCol,
                  !buildingData.yearOfConstruction && styles.notAvailableText,
                ]}
              >
                {buildingData.yearOfConstruction || 'Not available'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Type of Structure</Text>
              <Text
                style={[
                  styles.tableCol,
                  !buildingData.buildingStructuralSystem &&
                    styles.notAvailableText,
                ]}
              >
                {buildingData.buildingStructuralSystem || 'Not available'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Location</Text>
              <Text
                style={[
                  styles.tableCol,
                  !buildingData.location && styles.notAvailableText,
                ]}
              >
                {buildingData.location || 'Not available'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>
                Architectural Plan Available
              </Text>
              <Text
                style={[
                  styles.tableCol,
                  !buildingData.architecturalUrl && styles.notAvailableText,
                ]}
              >
                {buildingData.architecturalUrl ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Foundation Type</Text>
              <Text
                style={[
                  styles.tableCol,
                  !buildingData.foundationType && styles.notAvailableText,
                ]}
              >
                {buildingData.foundationType || 'Not available'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Other Information</Text>
              <Text
                style={[
                  styles.tableCol,
                  !buildingData.otherInformation && styles.notAvailableText,
                ]}
              >
                {buildingData.otherInformation || 'Not available'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Ground Coverage Area</Text>
              <Text
                style={[
                  styles.tableCol,
                  !buildingData.groundCoverageArea && styles.notAvailableText,
                ]}
              >
                {buildingData.groundCoverageArea || 'Not available'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Total Built-Up Area</Text>
              <Text
                style={[
                  styles.tableCol,
                  !buildingData.totalBuiltUpArea && styles.notAvailableText,
                ]}
              >
                {buildingData.totalBuiltUpArea || 'Not available'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Dampness Cracks</Text>
              <Text
                style={[
                  styles.tableCol,
                  buildingData.dampnessCracks === undefined &&
                    styles.notAvailableText,
                ]}
              >
                {buildingData.dampnessCracks ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Non-Dampness Cracks</Text>
              <Text
                style={[
                  styles.tableCol,
                  buildingData.nondampnessCracks === undefined &&
                    styles.notAvailableText,
                ]}
              >
                {buildingData.nondampnessCracks ? 'Yes' : 'No'}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Building Image</Text>
              {buildingData.buildingImage ? (
                <Image
                  style={styles.tableCol}
                  src={buildingData.buildingImage}
                  alt="Building Image"
                />
              ) : (
                <Text style={[styles.tableCol, styles.notAvailableText]}>
                  Not available
                </Text>
              )}
            </View>
          </View>
        </View>
      </Page>
      <Page style={styles.page}>
        {user && <Text style={styles.watermark}>{user?.email}</Text>}
        <View style={styles.section}>
          <Text style={styles.sectionMainHeading}>Structural Data</Text>
          {renderStructuralData(structuralData, styles)}
        </View>
      </Page>
      <Page style={styles.page}>
        {user && <Text style={styles.watermark}>{user?.email}</Text>}
        <View style={styles.section}>
          <Text style={styles.sectionMainHeading}>NDT Data</Text>
          {renderData(sortedNdtdata.corrosion, styles)}
          {renderData(sortedNdtdata.inSitu, styles)}
          {renderData(sortedNdtdata.strucuturalIntegrity, styles)}
        </View>
        {hasData(ndtData.chemical.carbonation) && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Chemical - Carbonation</Text>
            <View style={styles.table}>
              {Object.entries(ndtData.chemical.carbonation).map(
                ([key, value]) => {
                  if (hasData(value)) {
                    return renderTableRow(key, value);
                  }
                  return null;
                }
              )}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};
export default MyDocument;

// Your hasData function
const hasData = (value) => {
  if (Array.isArray(value)) {
    return value.some((item) => Object.values(item).some((v) => v !== ''));
  } else if (typeof value === 'object' && value !== null) {
    return Object.values(value).some((v) => v !== '');
  }
  return Boolean(value);
};

// const renderTableRow = (field, value, styles) => (
//   <View key={field} style={styles.tableRow}>
//     <Text style={styles.tableColHeader}>{field}</Text>
//     <Text style={styles.tableCol}>{value}</Text>
//   </View>
// );

const renderTableRow = (field, value, styles) => {
  const isRemarks = field === 'remarks';
  const headerStyle = [
    styles.tableColHeader,
    isRemarks && { backgroundColor: '#f94449' }, // Append color dynamically
  ];
  const valueStyle = [
    styles.tableCol,
    isRemarks && { backgroundColor: '#f94449' }, // Append color dynamically
  ];

  return (
    <View key={field} style={styles.tableRow}>
      <Text style={headerStyle}>{field}</Text>
      <Text style={valueStyle}>{value}</Text>
    </View>
  );
};

// Function to sort object keys and recursively sort nested objects
const sortObjectKeysRecursively = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeysRecursively);
  }
  if (typeof obj === 'object' && obj !== null) {
    const sortedKeys = Object.keys(obj).sort();
    const sortedObj = {};
    sortedKeys.forEach((key) => {
      sortedObj[key] = sortObjectKeysRecursively(obj[key]);
    });
    return sortedObj;
  }
  return obj;
};

// Sorted ndtdata

const renderData = (ndtdata, styles) => {
  if (!ndtdata) {
    return null;
  }
  return Object.entries(ndtdata).map(([topic, subtopics]) => {
    const renderedSubtopics = Object.entries(subtopics)
      .map(([subtopic, levels]) => {
        const hasDataToShow = Object.values(levels).some((levelData) => {
          if (Array.isArray(levelData)) {
            return levelData.some((item) => hasData(item));
          } else {
            return hasData(levelData);
          }
        });

        if (!hasDataToShow) {
          return null;
        }

        return (
          <View key={`${topic}-${subtopic}`} style={styles.table}>
            {subtopic && <Text style={styles.subtopic}>{subtopic}</Text>}
            {Object.entries(levels).map(([level, data]) => {
              if (Array.isArray(data)) {
                return (
                  <View key={`${topic}-${subtopic}-${level}`}>
                    {data.map((item, index) => {
                      if (!hasData(item)) {
                        return null;
                      }
                      return (
                        <View
                          key={`${topic}-${subtopic}-${level}-${index}`}
                          style={{
                            borderBottom: '1px solid black',
                            paddingBottom: 5,
                            marginBottom: 5,
                          }}
                        >
                          {Object.entries(item).map(([field, fieldValue]) => {
                            if (hasData(fieldValue)) {
                              return renderTableRow(field, fieldValue, styles);
                            }
                            return null;
                          })}
                        </View>
                      );
                    })}
                  </View>
                );
              } else {
                if (hasData(data)) {
                  return (
                    <View key={`${topic}-${subtopic}-${level}`}>
                      {Object.entries(data).map(([field, fieldValue]) => {
                        if (hasData(fieldValue)) {
                          return renderTableRow(field, fieldValue, styles);
                        }
                        return null;
                      })}
                    </View>
                  );
                }
                return null;
              }
            })}
          </View>
        );
      })
      .filter(Boolean);

    if (renderedSubtopics.length === 0) {
      return null;
    }

    return (
      <View key={topic} style={styles.section}>
        <Text style={styles.sectionHeader}>{topic}</Text>
        {renderedSubtopics}
      </View>
    );
  });
};
