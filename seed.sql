-- Adds nine made-up records, but ONLY when the table is empty (so it runs once).
INSERT INTO records (title, category, description, status)
SELECT * FROM (VALUES
  ('Find books on database design', 'Book search', 'I need textbooks on relational database design for my ICT251 project.', 'Pending'),
  ('Renew borrowed Networking textbook', 'Borrowing', 'My Computer Networks book is due tomorrow and I need two more weeks.', 'In progress'),
  ('Library card not working at the gate', 'Account help', 'My student card is not recognised by the entrance scanner.', 'Pending'),
  ('Reserve a copy of Engineering Mathematics', 'Borrowing', 'Please reserve one copy for me when it is returned.', 'Completed'),
  ('Search for past examination papers', 'Book search', 'I cannot find the 2024 Web Technologies past papers in the catalogue.', 'In progress'),
  ('Reset library portal password', 'Account help', 'I forgot my password and the reset email never arrives.', 'Completed'),
  ('Request an inter-library loan', 'Borrowing', 'I need a journal article that is not available in our library.', 'Pending'),
  ('Report a damaged book', 'Book search', 'Pages are missing from the Java Programming book on shelf QA76.', 'In progress'),
  ('Ask about group study room booking', 'Account help', 'How can a group of five book a quiet study room for Friday?', 'Completed')
) AS v (title, category, description, status)
WHERE NOT EXISTS (SELECT 1 FROM records);
