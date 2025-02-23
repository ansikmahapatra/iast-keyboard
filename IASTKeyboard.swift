import UIKit

class KeyboardViewController: UIInputViewController {
    let keys: [[String]] = [
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        ["a", "ā", "i", "ī", "u", "ū", "e", "o", "h", "ḥ"],
        ["k", "g", "c", "j", "t", "d", "ṭ", "ḍ", "p", "b"],
        ["n", "ṅ", "ñ", "ṇ", "ṉ", "m", "ṃ", "m̐", "~", "v"],
        ["s", "ś", "ṣ", "y", "ẏ", "r", "ṛ", "ṝ", "r̤", "ṟ"],
        ["l", "ḷ", "ḹ", "l̤", "ḻ", "q", "ġ", "z", "f", "k͟h"]
    ]

    override func viewDidLoad() {
        super.viewDidLoad()
        setupKeyboard()
    }

    func setupKeyboard() {
        let keyboardView = UIView()
        keyboardView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(keyboardView)

        NSLayoutConstraint.activate([
            keyboardView.leftAnchor.constraint(equalTo: view.leftAnchor),
            keyboardView.rightAnchor.constraint(equalTo: view.rightAnchor),
            keyboardView.topAnchor.constraint(equalTo: view.topAnchor),
            keyboardView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])

        let buttonHeight: CGFloat = 50

        for row in keys {
            let rowView = UIStackView()
            rowView.axis = .horizontal
            rowView.distribution = .fillEqually
            rowView.spacing = 5

            for key in row {
                let button = UIButton(type: .system)
                button.setTitle(key, for: .normal)
                button.titleLabel?.font = UIFont.systemFont(ofSize: 24)
                button.backgroundColor = .lightGray
                button.layer.cornerRadius = 8
                button.addTarget(self, action: #selector(keyTapped(_:)), for: .touchUpInside)
                rowView.addArrangedSubview(button)
            }

            rowView.translatesAutoresizingMaskIntoConstraints = false
            keyboardView.addSubview(rowView)

            NSLayoutConstraint.activate([
                rowView.heightAnchor.constraint(equalToConstant: buttonHeight),
                rowView.leftAnchor.constraint(equalTo: keyboardView.leftAnchor, constant: 5),
                rowView.rightAnchor.constraint(equalTo: keyboardView.rightAnchor, constant: -5)
            ])
        }
    }

    @objc func keyTapped(_ sender: UIButton) {
        guard let title = sender.currentTitle else { return }
        textDocumentProxy.insertText(title)
    }
}
