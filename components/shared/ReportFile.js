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
  sectionHeader: {
    fontSize: 16,
    marginBottom: 10,
    textDecoration: 'underline',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  subtopic: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'semibold',
    textTransform: 'capitalize',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '40%',
    borderStyle: 'solid',
    borderColor: '#000',
    border: 1,
    fontSize: 12,
    fontWeight: 'bold',
    padding: 5,
    textTransform: 'capitalize',
     fontFamily: 'Times-Roman', // Set font family
     fontSize: 12,

  },
  tableCol: {
    width: '60%',
    borderStyle: 'solid',
    borderColor: '#000',
    border: 1,
    // borderBottomWidth: 1,
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
    zIndex: -1,
    pointerEvents: 'none',
  },
});

// Create Document Component
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
          <Text>Loading...</Text>
        </Page>
      </Document>
    );
  }

  const generalObservations = reportData.generalObservationsData;
  const structuralData = reportData.structuralObservationsData;
  const buildingData = reportData.buildingData;
  const ndtData = reportData.ndtdata;

  // Helper function to render table rows with potential images
  const renderTableRow = (field, fieldValue) => {
    if (field === 'photo' && fieldValue) {
      return (
        <View style={styles.tableRow} key={field} classroom="border">
          <Text style={styles.tableColHeader}>{field}</Text>
          <Image style={styles.tableCol} src={fieldValue} alt="field" />
        </View>
      );
    }
    return (
      fieldValue && (
        <View style={styles.tableRow} key={field}>
          <Text style={styles.tableColHeader}>{field}</Text>
          <Text style={styles.tableCol}>{fieldValue}</Text>
        </View>
      )
    );
  };

  const renderStructuralData = (data) => {
    return Object.entries(data).map(([key, value]) => {
      if (hasData(value)) {
        return (
          <View key={key} style={styles.table}>
            <Text style={styles.sectionHeader}>{key}</Text>
            {Object.entries(value).map(([subKey, subValue]) => {
              if (hasData(subValue)) {
                return (
                  <View key={subKey} style={styles.table}>
                    {subKey && <Text style={styles.subtopic}>{subKey}</Text>}
                    {Object.entries(subValue).map(([field, fieldValue]) => {
                      if (hasData(fieldValue)) {
                        return renderTableRow(field, fieldValue);
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
          <Text style={styles.sectionHeader}>Report</Text>
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
          <Text style={styles.sectionHeader}>General Observations</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Age of Building</Text>
              <Text style={styles.tableCol}>
                {generalObservations.ageOfBuilding}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Number of Stories</Text>
              <Text style={styles.tableCol}>
                {generalObservations.numberOfStories}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Date of Inspection</Text>
              <Text style={styles.tableCol}>
                {generalObservations.dateOfInspection}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Type of Structure</Text>
              <Text style={styles.tableCol}>
                {generalObservations.typeOfStructure}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Location</Text>
              <Text style={styles.tableCol}>
                {generalObservations.location}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>
                Architectural Plan Available
              </Text>
              <Text style={styles.tableCol}>
                {generalObservations.architecturalPlanAvailable ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Name of Structure</Text>
              <Text style={styles.tableCol}>
                {generalObservations.nameOfStructure}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Size of Building</Text>
              <Text style={styles.tableCol}>
                {generalObservations.sizeOfBuilding}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Building Details</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Building Name</Text>
              <Text style={styles.tableCol}>{buildingData.buildingName}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Number of Stories</Text>
              <Text style={styles.tableCol}>{buildingData.noOfStories}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Year of Construction</Text>
              <Text style={styles.tableCol}>
                {buildingData.yearOfConstruction}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Type of Structure</Text>
              <Text style={styles.tableCol}>
                {buildingData.buildingStructuralSystem}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Location</Text>
              <Text style={styles.tableCol}>{buildingData.location}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>
                Architectural Plan Available
              </Text>
              <Text style={styles.tableCol}>
                {buildingData.architecturalUrl ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Foundation Type</Text>
              <Text style={styles.tableCol}>{buildingData.foundationType}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Other Information</Text>
              <Text style={styles.tableCol}>
                {buildingData.otherInformation}
              </Text>
            </View>
            <View style={styles.tableRow} classroom="border">
              <Text style={styles.tableColHeader}>Building Image</Text>
              <Image
                style={styles.tableCol}
                src={buildingData.buildingImage}
                alt="field"
              />
            </View>
          </View>
        </View>
      </Page>
      <Page style={styles.page}>
      {user && <Text style={styles.watermark}>{user?.email}</Text>}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Structural Data</Text>
          {renderStructuralData(structuralData)}
        </View>
      </Page>
      <Page style={styles.page}>
      {user && <Text style={styles.watermark}>{user?.email}</Text>}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>NDT Data</Text>
          {renderData(ndtData.corrosion, styles)}
          {renderData(ndtData.inSitu, styles)}
          {renderData(ndtData.strucuturalIntegrity, styles)}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Chemical - Carbonation</Text>
          <View style={styles.table}>
            {ndtData.chemical.carbonation.element && (
              <View key="element" style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Element</Text>
                <Text style={styles.tableCol}>
                  {ndtData.chemical.carbonation.element}
                </Text>
              </View>
            )}
            {ndtData.chemical.carbonation.grade && (
              <View key="grade" style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Grade</Text>
                <Text style={styles.tableCol}>
                  {ndtData.chemical.carbonation.grade}
                </Text>
              </View>
            )}
            {ndtData.chemical.carbonation.floor && (
              <View key="floor" style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Floor</Text>
                <Text style={styles.tableCol}>
                  {ndtData.chemical.carbonation.floor}
                </Text>
              </View>
            )}
            {ndtData.chemical.carbonation.location && (
              <View key="location" style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Location</Text>
                <Text style={styles.tableCol}>
                  {ndtData.chemical.carbonation.location}
                </Text>
              </View>
            )}
            {ndtData.chemical.carbonation.meanDepth && (
              <View key="meanDepth" style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Mean Depth</Text>
                <Text style={styles.tableCol}>
                  {ndtData.chemical.carbonation.meanDepth}
                </Text>
              </View>
            )}
            {ndtData.chemical.carbonation.ageOfStrcutural && (
              <View key="ageOfStrcutural" style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Age Of Structural</Text>
                <Text style={styles.tableCol}>
                  {ndtData.chemical.carbonation.ageOfStrcutural}
                </Text>
              </View>
            )}
            {ndtData.chemical.carbonation.captionPhoto && (
              <View key="captionPhoto" style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Caption Photo</Text>
                <Text style={styles.tableCol}>
                  {ndtData.chemical.carbonation.captionPhoto}
                </Text>
              </View>
            )}
            {ndtData.chemical.carbonation.remarks && (
              <View key="remarks" style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Remarks</Text>
                <Text style={styles.tableCol}>
                  {ndtData.chemical.carbonation.remarks}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default MyDocument;

const hasData = (value) => {
  if (Array.isArray(value)) {
    return value.some((item) => Object.values(item).some((v) => v !== ''));
  } else if (typeof value === 'object' && value !== null) {
    return Object.values(value).some((v) => v !== '');
  }
  return Boolean(value);
};

const renderTableRow = (field, value, styles) => (
  <View key={field} style={styles.tableRow}>
    <Text style={styles.tableColHeader}>{field}</Text>
    <Text style={styles.tableCol}>{value}</Text>
  </View>
);

const renderData = (ndtdata, styles) => {
  return Object.entries(ndtdata).map(([topic, subtopics]) => {
    return (
      <View key={topic} style={styles.section}>
        {topic && <Text style={styles.sectionHeader}>{topic}</Text>}
        {Object.entries(subtopics).map(([subtopic, levels]) => {
          return (
            <View key={`${topic}-${subtopic}`} style={styles.table}>
              {subtopic && <Text style={styles.subtopic}>{subtopic}</Text>}

              {Object.entries(levels).map(([level, data]) => {
                if (Array.isArray(data)) {
                  return (
                    <View
                      key={`${topic}-${subtopic}-${level}`}
                      style={styles.table}
                    >
                      {data.map((item, index) => (
                        <View
                          key={`${topic}-${subtopic}-${level}-${index}`}
                          style={styles.table}
                        >
                          {Object.entries(item).map(([field, fieldValue]) => {
                            if (hasData(fieldValue)) {
                              return renderTableRow(field, fieldValue, styles);
                            }
                            return null;
                          })}
                        </View>
                      ))}
                    </View>
                  );
                } else {
                  if (hasData(data)) {
                    return (
                      <View
                        key={`${topic}-${subtopic}-${level}`}
                        style={styles.table}
                      >
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
        })}
      </View>
    );
  });
};
