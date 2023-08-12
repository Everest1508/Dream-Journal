from flask import Flask,render_template, request,send_file,redirect,url_for
import csv

app = Flask(__name__)
# data_list=[]
app.use_static_for = "static"

def read_data_from_csv():
    data_list = []
    try:
        with open('data.csv', 'r', newline='', encoding='utf-8') as csvfile:
            csvreader = csv.DictReader(csvfile)
            for row in csvreader:
                data_list.append(row)
    except FileNotFoundError:
        pass
    return data_list

@app.route('/')
def index():
    data_list = read_data_from_csv()
    return render_template('index.html',data=data_list)

@app.route("/", methods=['POST'])
def contact_form():
    title = request.form.get("title")
    name = request.form.get("name")
    genre = request.form.get("genre")
    description = request.form.get("description")
    date = request.form.get("date")
    data_list = read_data_from_csv()
    data_list.append({'Title': title, 'Date': date, 'Genre': genre, 'Description': description, 'Name': name})
    with open('data.csv', 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['Title', 'Date', 'Genre', 'Description', 'Name']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data_list)

    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True)