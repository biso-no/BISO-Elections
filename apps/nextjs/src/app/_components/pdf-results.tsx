import React from "react";
import { FileTextIcon } from "@radix-ui/react-icons";
import {
  Document,
  Font,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import type { RouterOutputs } from "@acme/api";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "~/components/ui/dialog";
import { api } from "~/trpc/react";

// Sample data representing election results
const electionResults = [
  {
    session: "Session 1",
    positions: [
      {
        title: "President",
        candidates: [
          { name: "Candidate A", votes: 150 },
          { name: "Candidate B", votes: 200 },
          { name: "Candidate C", votes: 180 },
        ],
      },
      {
        title: "Vice President",
        candidates: [
          { name: "Candidate X", votes: 220 },
          { name: "Candidate Y", votes: 190 },
          { name: "Candidate Z", votes: 170 },
        ],
      },
    ],
  },
  {
    session: "Session 2",
    positions: [
      {
        title: "President",
        candidates: [
          { name: "Candidate A", votes: 150 },
          { name: "Candidate B", votes: 200 },
          { name: "Candidate C", votes: 180 },
        ],
      },
      {
        title: "Vice President",
        candidates: [
          { name: "Candidate X", votes: 220 },
          { name: "Candidate Y", votes: 190 },
          { name: "Candidate Z", votes: 170 },
        ],
      },
    ],
  },
];

// Define styles for PDF components
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: "#f6f6f5",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3d3d3c",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#3d3d3c",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: "#3d3d3c",
  },
  candidate: {
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 10,
    color: "#3d3d3c",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  tableCol: {
    width: "50%",
    borderRightColor: "#000",
    borderRightWidth: 1,
    textAlign: "center",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
  totalVotes: {
    fontSize: 12,
    marginTop: 10,
    color: "#3d3d3c",
  },
});

interface ElectionResults {
  electionResults: RouterOutputs["elections"]["results"];
}
// Define the PDF component
function ElectionResultsPDF({ electionResults }: ElectionResults) {
  //Total votes for each position
  //Total votes for each position
  const totalVotes = (
    candidates: { votes: { id: string; electionCandidateId: string }[] }[],
  ) => candidates.reduce((acc, candidate) => acc + candidate.votes.length, 0);

  return (
    <Document>
      {electionResults?.sessions.map((session, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Election Results</Text>
            <Text style={styles.subtitle}>Session: {session.name}</Text>
            {session.positions.map((position, index) => (
              <View key={index}>
                <Text style={styles.subtitle}>{position.name}</Text>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCol, styles.tableCell]}>
                    Candidate
                  </Text>
                  <Text style={[styles.tableCol, styles.tableCell]}>Votes</Text>
                </View>
                {position.candidates.map((candidate, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={[styles.tableCol, styles.tableCell]}>
                      {candidate.name}
                    </Text>
                    <Text style={[styles.tableCol, styles.tableCell]}>
                      {candidate.votes.length}
                    </Text>
                  </View>
                ))}
                <Text style={styles.totalVotes}>
                  Total Votes: {totalVotes(position.candidates)}
                </Text>
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  );
}

interface PDFResultsProps {
  electionId: string;
}
// Define the PDF results component
export const PDFResults = ({ electionId }: PDFResultsProps) => {
  const { data: electionResults } = api.elections.results.useQuery(electionId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="gap-2">
          <FileTextIcon /> Print Results
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild>
          <PDFViewer style={{ width: "100%", minHeight: "80vh" }}>
            <ElectionResultsPDF electionResults={electionResults} />
          </PDFViewer>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
